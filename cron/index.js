require("dotenv").config();

const db = require("../../../models");
const hot_post = db.hot_post;
const post_record = db.post_record;
const hot_bingo = db.hot_bingo;
const bingo_record = db.bingo_record;
const my_bingo = db.my_bingo;
const Op = db.Sequelize.Op;
const backendService = require('../../services/backend');
const oneSignal = require('../../services/oneSignal.services');

const date = new Date();
date.setDate(date.getDate() + 1);

class CronService {
    static async getHotPosts() {
        console.log('getHotPost running')
        const dataPost = await post_record.findAll({
            where: {
                deletedAt: null,
            },
            order:[
                ['like_get', 'DESC'],
                ['comment_get', 'DESC'],
                ['createdAt', 'DESC']
            ],
            limit: 10,
            raw: true
        });
        try {
            for (const data of dataPost) {
                await post_record.update({
                    hot_total: data.hot_total + 1,
                    update_by: 'cron_service',
                    updateAt: new Date()
                },{
                    where: {
                        id: data.id,
                    }
                });

                await hot_post.create({
                    user_id: data.user_id,
                    post_id: data.post_id,
                    created_by: 'cron_service',
                    createdAt: date.toJSON().slice(0,10),
                    updatedAt: new Date()
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async getHotBingos() {
        console.log('getHotBingo running')
        const dataBingo = await bingo_record.findAll({
            where: {
                deletedAt: null,
            },
            order:[
                ['sell_total', 'DESC'],
                ['wishlist_total', 'DESC'],
                ['createdAt', 'DESC']
            ],
            limit: 10,
            raw: true
        });
        try {
            for (const data of dataBingo) {
                await bingo_record.update({
                    hot_total: data.hot_total + 1,
                    updated_by: 'cron_service',
                    updateAt: new Date()
                },{
                    where: {
                        id: data.id,
                    }
                });

                await hot_bingo.create({
                    bingo_shop_id: data.bingo_shop_id,
                    created_by: 'cron_service',
                    createdAt: date.toJSON().slice(0,10),
                    updatedAt: new Date()
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async expiredBingo() {
        console.log('running expired bingo');
        const expDate = new Date();
        const myBingo = await my_bingo.findAll({
            where: {
                [Op.or]: [{ 'status': 'c1' }, { 'status': 'c2' }],
                deletedAt: null
            },
            raw: true
        });
        try {
            for (const x of myBingo) {
                if (x.expiredAt !== null) {
                    const dataDate = new Date(x.expiredAt);
                    if (expDate > dataDate) {
                        await my_bingo.update({
                            status: 'c3',
                            updated_by: 'cron_service',
                            end_date: x.expiredAt,
                            updatedAt: new Date()
                        },{
                            where: {
                                id: x.id
                            }
                        })
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async sendAlarmNotif() {
        console.log('running bingo alarm');
        const d = new Date();
        const hour = d.getHours();
        const minute = d.getMinutes();
        const time = hour + ':' + minute + ':00'
        console.log(time)
        const dataBingo = await my_bingo.findAll({
            where: {
                status: 'c1',
                deletedAt: null,
            },
            raw: true,
        });
        try {
            const xx = [];
            for (const x of dataBingo) {
                const dataUser = await backendService.getUserProfile(x.user_id);
                const user = dataUser.data;
                console.log(user.notif_alarm == true && user.notif_alarm_time != null)
                if (user.notif_alarm == true && user.notif_alarm_time != null) {
                    if (user.notif_alarm_time == time) {
                        const notif = await oneSignal.sendNotif({
                            title: 'Bingo Alarm',
                            description: 'You have Bingo in progress, dont forget to post your picture or video in your Bingo',
                            userId: JSON.stringify(x.user_id),
                        })
                        console.log(notif)
                        xx.push(user)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CronService;