/**
    Android uexNIM插件回调和监听都在root页，所以需要特殊处理从root页获取相应的回调或监听事件。

*/
define(["CC", "RootObserver"],
function(CC, RootObserver) {
    if (!UNIT_TEST) return;

    var cbHelper = {};
    cbHelper.baseCallback = function(error, data) {
        if (!error) {
            if (cbHelper.success != undefined) {
                cbHelper.success(data);
                delete cbHelper.success;
            }
            UNIT_TEST.assert(true);
        } else {
            if (cbHelper.fail != undefined) {
                cbHelper.fail(data);
                delete cbHelper.fail;
            }
            UNIT_TEST.assert(false);

        }
    }
    var constant = {};
    constant.user2TeamId = 7967970; // 帐号为user2创建的一个群
    constant.user1TeamId = 7973281;
    var uexNIMCase = {};
    uexNIMCase.registerApp = function() {
        var params = {
            appKey: "8ce4f10b741de88e2b6bd86fb9c27cc3",
            //区别app的标识
            apnsCertName: "ENTERPRISE",
            //iOS中推送证书名称(仅iOS)
        };
        var data = JSON.stringify(params);
        uexNIM.registerApp(JSON.stringify(params), cbHelper.baseCallback);
    }
    uexNIMCase.login = function() {
        var param = {
            userId: "user1",
            //用户名
            password: "123456",
            //密码
        };
        cbHelper.fail = function(data) {
            UNIT_TEST.log(JSON.stringify(data));
        }
        uexNIM.login(JSON.stringify(param), cbHelper.baseCallback);
    }
    uexNIMCase.autoLogin = function() {
        if (uexWidgetOne.platformName.indexOf('android') > -1) {
            UNIT_TEST.log("Android 当前不支持");
            UNIT_TEST.assertTrue(true);
            return;
        }
        var param = {
            userId: "user1",
            //用户名
            password: "123456",
            //密码
        };
        cbHelper.fail = function(data) {
            UNIT_TEST.log(JSON.stringify(data));
        }
        uexNIM.autoLogin(JSON.stringify(param), cbHelper.baseCallback);
    }
    uexNIMCase.sendText = function() {
        var params = {
            sessionId: "user2",
            sessionType: 0,
            content: "Textcontent",
            ext: {
                "ext": "extValueText"
            }
        };
        var observer = new RootObserver("uexNIM.onMessageSend");
        observer.once(function(data) {
            UNIT_TEST.log("onMessageSend:" + data);
            UNIT_TEST.assertTrue(true);

        });
        uexNIM.sendText(JSON.stringify(params));
    }
    uexNIMCase.sendImage = function() {
        var params = {
            sessionId: "user2",
            sessionType: 0,
            filePath: "res://2.jpg",
            displayName: "image_name",
            ext: {
                "ext": "extValueImage"
            }
        };
        var observer = new RootObserver("uexNIM.onMessageSend");
        observer.once(function(data) {
            UNIT_TEST.log("onMessageSend" + data);
            UNIT_TEST.assertTrue(true);
        });
        uexNIM.sendImage(JSON.stringify(params));
    }
    uexNIMCase.sendLocationMsg = function() {
        var params = {
            sessionId: "user2",
            sessionType: 0,
            latitude: "29.58",
            longitude: "113.41",
            title: "武汉市",
            ext: {
                "ext": "extValueLocation"
            }
        };
        var observer = new RootObserver("uexNIM.onMessageSend");
        observer.once(function(data) {
            UNIT_TEST.log("onMessageSend" + data);
            UNIT_TEST.assertTrue(true);
        });
        uexNIM.sendLocationMsg(JSON.stringify(params));
    }
    uexNIMCase.sendAudio = function() {
        var params = {
            sessionId: "user2",
            sessionType: 0,
            filePath: "res://callRing.mp3",
            ext: {
                "ext": "extValueAudio"
            }
        };
        var observer = new RootObserver("uexNIM.onMessageSend");
        observer.once(function(data) {
            UNIT_TEST.log("onMessageSend" + data);
            UNIT_TEST.assertTrue(true);
        });
        uexNIM.sendAudio(JSON.stringify(params));
    }
    uexNIMCase.sendVideo = function() {
        var params = {
            sessionId: "user2",
            sessionType: 0,
            filePath: "res://1.mp4",
            displayName: "video title",
            ext: {
                "ext": "extValueAudio"
            }
        };
        var observer = new RootObserver("uexNIM.onMessageSend");
        observer.once(function(data) {
            UNIT_TEST.log("onMessageSend" + data);
            UNIT_TEST.assertTrue(true);
        });
        uexNIM.sendVideo(JSON.stringify(params));
    }
    uexNIMCase.sendFile = function() {
        var params = {
            sessionId: "user2",
            sessionType: 0,
            filePath: "res://1.mp4",
            ext: {
                "ext": "extValueFile"
            }
        };
        var observer = new RootObserver("uexNIM.onMessageSend");
        observer.once(function(data) {
            UNIT_TEST.log("onMessageSend" + data);
            UNIT_TEST.assertTrue(true);
        });
        uexNIM.sendFile(JSON.stringify(params));
    }
    uexNIMCase.willSendMessage = function() {
        var params = {
            sessionId: "user2",
            sessionType: 0,
            content: "Textcontent",
            ext: {
                "ext": "extValueText"
            }
        };
        var observer = new RootObserver("uexNIM.willSendMessage");
        observer.once(function(data) {
            UNIT_TEST.log("onMessageSend");
            UNIT_TEST.assertTrue(true);

        });
        uexNIM.sendText(JSON.stringify(params));
    }
    uexNIMCase.onSendMessageWithProgress = function() {
        var params = {
            sessionId: "user2",
            sessionType: 0,
            filePath: "res://1.mp4",
            ext: {
                "ext": "extValueFile"
            }
        };
        var observer = new RootObserver("uexNIM.onSendMessageWithProgress");
        observer.once(function(data) {
            UNIT_TEST.log("data:" + data);
            UNIT_TEST.assertTrue(true);
        });
        uexNIM.sendFile(JSON.stringify(params));
    }
    uexNIMCase.onRecvMessages = function() {
        UNIT_TEST.log("请用另一手机向当前用户发送一条消息测试：");
        var observer = new RootObserver("uexNIM.onRecvMessages");
        observer.once(function(param) {
            UNIT_TEST.log("data:" + param);
            CC.confirm("请确认数据是否正确",
            function(ret) {
                UNIT_TEST.assert(ret);
            });
        });
    }
    uexNIMCase.allRecentSession = function() {
        uexNIM.allRecentSession(function(error, data) {
            if (!error) {
                UNIT_TEST.log("data:" + JSON.stringify(data));
                UNIT_TEST.assert(true);
            } else {
                UNIT_TEST.assert(false);
            }
        });
    }
    //--------------------历史记录-------------
    uexNIMCase.fetchMessageHistory = function() {
        var param = {
            sessionType: 0,
            sessionId: "user2",
            limit: 50,
            order: 0,
        }
        uexNIM.fetchMessageHistory(JSON.stringify(param),
        function(error, data) {
            if (!error) {
                UNIT_TEST.log("data:" + JSON.stringify(data));
                UNIT_TEST.assert(true);
            } else {
                UNIT_TEST.assert(false);
            }
        });
    }
    uexNIMCase.switchAudioOutputDevice = function() {
        var param = {
            outputDevice: 1,
            //0:听筒,1:扬声器
        };
        var result = uexNIM.switchAudioOutputDevice(JSON.stringify(param));
        UNIT_TEST.assert(result);
    }
    uexNIMCase.isPlaying = function() {
        var isPlaying = uexNIM.isPlaying();
        UNIT_TEST.log('isPlaying:' + isPlaying);
        UNIT_TEST.assert(true);
    }
    uexNIMCase.playAudio = function() {
        var param = {
            filePath: "res://callRing.mp3"
        };
        cbHelper.success = function(data) {
            if (data.status == 1) {
                UNIT_TEST.log('-----prepared----');
            } else if (data.status == 2) {
                UNIT_TEST.log('-----competetion----');
            }
        }
        uexNIM.playAudio(JSON.stringify(param), cbHelper.baseCallback);
    }
    uexNIMCase.stopPlay = function() {
        uexNIM.stopPlay(cbHelper.baseCallback);
    }
    uexNIMCase.isRecording = function() {
        var flag = uexNIM.isRecording();
        UNIT_TEST.log('isRecording:' + flag);
        UNIT_TEST.assert(true);
    }
    //         //-----------------------群组------------------
    uexNIMCase.allMyTeams = function() {
        cbHelper.success = function(data) {
            UNIT_TEST.log('data:' + JSON.stringify(data));
        }
        uexNIM.allMyTeams(cbHelper.baseCallback)
    }
    uexNIMCase.teamById = function() {
        cbHelper.success = function(data) {
            UNIT_TEST.log('data:' + JSON.stringify(data));
        }
        var param = {
            teamId: 3405273
        };
        uexNIM.teamById(JSON.stringify(param), cbHelper.baseCallback);
    }
    uexNIMCase.fetchTeamInfo = function() {
        cbHelper.success = function(data) {
            UNIT_TEST.log('data:' + JSON.stringify(data));
        }
        var param = {
            teamId: 3405273
        };
        uexNIM.fetchTeamInfo(JSON.stringify(param), cbHelper.baseCallback);
    }
    uexNIMCase.createTeam = function() {
        cbHelper.success = function(data) {
            UNIT_TEST.log('data:' + JSON.stringify(data));
        }
        var param = {
            name: "all in 1",
            type: 1,
            joinMode: 1,
            postscript: "hehe",
            intro: "welcome to all in 1 team",
            announcement: "appcan test",
            users: ["appcanuser2"]
        }
        uexNIM.createTeam(JSON.stringify(param), cbHelper.baseCallback);
    }
    uexNIMCase.addUsers = function() {
        var param2 = {
            teamId: 7973281,
            users: ["user2"],
            postscript: "hello"
        };
        cbHelper.fail = function(data) {
            UNIT_TEST.log("fail reason:" + data);
        }
        uexNIM.addUsers(JSON.stringify(param2), cbHelper.baseCallback);
    }
    uexNIMCase.rejectInviteWithTeam = function() {
        CC.confirm("请用帐号user2来邀请用户加入群" + constant.user2TeamId,
        function() {
            var param = {
                teamId: constant.user2TeamId,
                invitorId: "user2",
                rejectReason: "reject"
            };
            cbHelper.fail = function(data) {
                UNIT_TEST.log("fail reason:" + data);
            }
            uexNIM.rejectInviteWithTeam(JSON.stringify(param), cbHelper.baseCallback);
        });
    }
    uexNIMCase.acceptInviteWithTeam = function() {
        CC.confirm("请再用帐号user2来邀请用户加入群" + constant.user2TeamId,
        function() {
            var param = {
                teamId: constant.user2TeamId,
                invitorId: "user2",
            };
            cbHelper.fail = function(data) {
                UNIT_TEST.log("fail reason:" + data);
            }
            uexNIM.acceptInviteWithTeam(JSON.stringify(param), cbHelper.baseCallback);
        });
    }
    uexNIMCase.applyToTeam = function() {
        var param = {
            teamId: constant.user2TeamId,
            message: "join you"
        };
        uexNIM.applyToTeam(param,
        function(error, data) {
            if (!error) {
                if (!data) {
                    UNIT_TEST.log("[data]" + JSON.stringify(data));
                }
                UNIT_TEST.assert(true);
            } else {
                UNIT_TEST.log('error msg:' + data);
                UNIT_TEST.assert(false);
            }
        });
    }

    uexNIMCase.rejectApplyToTeam = function() {
        var param1 = {
            teamId: constant.user1TeamId,
            users: "user2",
        };
        uexNIM.kickUsers(JSON.stringify(param1));
        CC.confirm("请用帐号user2来加入群" + constant.user1TeamId,
        function() {
            var param = {
                teamId: constant.user1TeamId,
                userId: "user2",
                rejectReason: "test"
            };
            uexNIM.rejectApplyToTeam(param,
            function(error, data) {
                if (!error) {
                    UNIT_TEST.assert(true);
                } else {
                    UNIT_TEST.log("[data]" + JSON.stringify(data));
                    UNIT_TEST.assert(false);
                }
            });
        });
    }
    uexNIMCase.passApplyToTeam = function() {
        CC.confirm("请用帐号user2来加入群" + constant.user1TeamId,
        function() {
            var param = {
                teamId: constant.user1TeamId,
                userId: "user2"
            };
            uexNIM.passApplyToTeam(JSON.stringify(param),
            function(error, data) {
                if (!error) {
                    UNIT_TEST.assert(true);
                } else {
                    UNIT_TEST.log("[data]" + JSON.stringify(data));
                    UNIT_TEST.assert(false);
                }
            });
        });
    }
    uexNIMCase.updateTeamName = function() {
        var param = {
            teamId: constant.user1TeamId,
            teamName: "Test1"
        };
        uexNIM.updateTeamName(param, cbHelper.baseCallback);
    }
    uexNIMCase.updateTeamIntro = function() {
        var param = {
            teamId: constant.user1TeamId,
            intro: "team info"
        };
        uexNIM.updateTeamIntro(param, cbHelper.baseCallback);
    }
    uexNIMCase.updateTeamAnnouncement = function() {
        var param = {
            teamId: constant.user1TeamId,
            announcement: "team announcement"
        };
        uexNIM.updateTeamAnnouncement(param, cbHelper.baseCallback);
    }
    uexNIMCase.updateTeamJoinMode = function() {
        var param = {
            teamId: constant.user1TeamId,
            joinMode: 1
        };
        uexNIM.updateTeamJoinMode(param, cbHelper.baseCallback);
    }
    uexNIMCase.addManagersToTeam = function() {
        var param = {
            teamId: constant.user1TeamId,
            users: ["user2"]
        };
        uexNIM.addManagersToTeam(param, cbHelper.baseCallback);
    }
    uexNIMCase.removeManagersFromTeam = function() {
        var param = {
            teamId: constant.user1TeamId,
            users: ["user2"]
        };
        uexNIM.addManagersToTeam(param, cbHelper.baseCallback);
    }
    uexNIMCase.transferManagerWithTeam = function() {
        var param = {
            teamId: constant.user1TeamId,
            newOwnerId: "user2",
            isLeave: false
        };
        uexNIM.transferManagerWithTeam(param, cbHelper.baseCallback);
    }
    uexNIMCase.fetchTeamMembers = function() {
        var param = {
            teamId: constant.user1TeamId

        };
        cbHelper.success = function(data) {
            UNIT_TEST.log("[Team info]:" + JSON.stringify(data));
        }
        uexNIM.fetchTeamMembers(param, cbHelper.baseCallback);
    }
    uexNIMCase.quitTeam = function() {
        //此时constant.user1TeamId对应的群已转给了user2
        var param = {
            teamId: constant.user1TeamId
        };
        uexNIM.quitTeam(JSON.stringify(param),
        function(error, data) {
            if (!error) {
                UNIT_TEST.assert(true);
            } else {
                UNIT_TEST.log("[data]" + JSON.stringify(data));
                UNIT_TEST.assert(false);
            }
        });
    }
    uexNIMCase.kickUsers = function() {
        CC.confirm("请先操作让user2加入群3406035",
        function() {
            var param = {
                teamId: 3406035,
                users: ["user2"]
            };
            uexNIM.kickUsers(JSON.stringify(param), cbHelper.baseCallback);
        });
    }
    uexNIMCase.dismissTeam = function() {
        var param = {
            name: "all in 1",
            type: 1,
            joinMode: 1,
            postscript: "hehe",
            intro: "welcome to all in 1 team",
            announcement: "appcan test",
            users: ["appcanuser2"]
        }
        uexNIM.createTeam(JSON.stringify(param),
        function(error, data) {
            UNIT_TEST.log('新创建的teamId:' + data.teamId);
            var param = {
                teamId: data.teamId,
            };
            uexNIM.dismissTeam(param, cbHelper.baseCallback);
        });
    }
    uexNIMCase.updateNotifyStateForTeam = function() {
        var param = {
            name: "all in 1",
            type: 1,
            joinMode: 1,
            postscript: "hehe",
            intro: "welcome to all in 1 team",
            announcement: "appcan test",
            users: ["appcanuser2"]
        }
        uexNIM.createTeam(JSON.stringify(param),
        function(error, data) {
            UNIT_TEST.log('新创建的teamId:' + data.teamId);
            var param = {
                teamId: data.teamId,
                notify: true
            }
            uexNIM.updateNotifyStateForTeam(JSON.stringify(param), cbHelper.baseCallback);
        });
    }

    //----------------------------- 系统通知 -----------------------------
    uexNIMCase.onReceiveSystemNotification = function() {
        UNIT_TEST.log("请邀请用户user1加入某个群来测试通知");
        var observer = new RootObserver("uexNIM.onReceiveSystemNotification");
        observer.once(function(data) { //此处data是json string.
            UNIT_TEST.log("[data]" + data);
            UNIT_TEST.assertTrue(true);
        });
    }
    uexNIMCase.fetchSystemNotifications = function() {
        var param = {
            limit: 5,
            //最大获取数
        };
        cbHelper.success = function(data) {
            UNIT_TEST.log('data:' + JSON.stringify(data));
        }
        uexNIM.fetchSystemNotifications(param, cbHelper.baseCallback);
    }
    uexNIMCase.allNotificationsUnreadCount = function() {
        var count = uexNIM.allNotificationsUnreadCount();
        UNIT_TEST.log("count:" + count);
        UNIT_TEST.assert(true);
    }

    uexNIMCase.markAllNotificationsAsRead = function() {
        var flag = uexNIM.markAllNotificationsAsRead();
        UNIT_TEST.assert(flag);
    }

    uexNIMCase.sendCustomNotification = function() {
        var param = {
            sessionType: 1,
            sessionId: constant.user1TeamId,
            sendToOnlineUsersOnly: 1,
            content: "content",
            apnsContent: "apnsContent",
            //apns推送文案,默认为nil,用户可以设置当前通知的推送文案
            shouldBeCounted: 1,
            //系统通知是否需要被计入苹果推送通知的未读计数,默认为TRUE.默认情况下,用户收到的自定义系统通知会在应用图标上累计未读.
            apnsEnabled: 1,
            //消息是否需要苹果推送,默认为TRUE.将这个字段设为FALSE,消息将不再有苹果推送通知.
            apnsWithPrefix: 1,
            //苹果推送是否需要带前缀(一般为昵称),默认为FALSE.将这个字段设为TRUE,推送消息将带有前缀(xx:).
        };
        var flag = uexNIM.sendCustomNotification(param);
        UNIT_TEST.assert(flag);
    }
    uexNIMCase.onReceiveCustomSystemNotification = function() {
        UNIT_TEST.log("请发送一个自定义系统通知至" + constant.user1TeamId);
        var observer = new RootObserver("uexNIM.onReceiveCustomSystemNotification");
        observer.once(function() {
            UNIT_TEST.assert(true);
        });
    }
    //------------------------------  聊天室 ------------------------------
    uexNIMCase.enterChatRoom = function() {
        var param = {
            roomId: 188398,
            //owner: appcanuser1, 当前管理员是user1
            nickName: "chat_user1",
            //用户在聊天室中的呢称
            avatar: "http://www.baidu.com/logo",
            //头像url
            extension: {
                ext: "extValue"
            },
            //扩展字段,非必须.json对象类型,进入聊天室后展示用户信息的扩展字段,长度限制4K
            notifyExtension: {
                notifyExt: "notifyExt"
            } //通知的扩展字段, 非必须.json对象类型, 进入聊天室通知消息扩展字段,长度限制1K(进入聊天室后,聊天室成员都会收到一条通知消息)
        };
        uexNIM.enterChatRoom(param, cbHelper.baseCallback);
    }
    uexNIMCase.exitChatRoom = function() {
        var param = {
            roomId: 188398,
            //聊天室Id, 必须
        };
        uexNIM.exitChatRoom(param, cbHelper.baseCallback);
        UNIT_TEST.assert(true);
    }
    uexNIMCase.getChatRoomHistoryMsg = function() {
        var param1 = {
            roomId: 188398,
            //聊天室Id, 必须
            nickName: "chat_user1",
            //用户在聊天室中的呢称
            avatar: "http://www.baidu.com/logo",
            //头像url
            extension: {
                ext: "extValue"
            },
            //扩展字段,非必须.json对象类型,进入聊天室后展示用户信息的扩展字段,长度限制4K
            notifyExtension: {
                notifyExt: "notifyExt"
            } //通知的扩展字段, 非必须.json对象类型, 进入聊天室通知消息扩展字段,长度限制1K(进入聊天室后,聊天室成员都会收到一条通知消息)
        };
        uexNIM.enterChatRoom(param1, cbHelper.baseCallback);
        var param = {
            roomId: 188398,
            //聊天室Id, 必须
        };
        uexNIM.getChatRoomHistoryMsg(param, cbHelper.baseCallback);
    }
    uexNIMCase.getChatRoomInfo = function() {
        var param = {
            roomId: 188398,
            //聊天室Id, 必须
        };
        cbHelper.success = function(data) {
            UNIT_TEST.log('data:' + JSON.stringify(data));
        }
        uexNIM.getChatRoomInfo(param, cbHelper.baseCallback);
    }
    uexNIMCase.getChatRoomMembers = function() {
        var param = {
            roomId: 188398,
            //聊天室Id, 必须
        };
        cbHelper.success = function(data) {
            UNIT_TEST.log('data:' + JSON.stringify(data));
        }
        uexNIM.getChatRoomMembers(param, cbHelper.baseCallback);
    }
    uexNIMCase.getChatRoomMembersByIds = function() {
        var param = {
            roomId: 188398,
            //聊天室Id, 必须
            userIds: ["user1", "user2"]
        };
        cbHelper.success = function(data) {
            UNIT_TEST.log('data:' + JSON.stringify(data));
        }
        uexNIM.getChatRoomMembersByIds(param, cbHelper.baseCallback);
    }
    uexNIMCase.onChatRoomStatusChanged = function() {
        var observer = new RootObserver("uexNIM.onChatRoomStatusChanged");
        observer.once(function(data) {
            UNIT_TEST.log('[data]' + data);
            UNIT_TEST.assert(true);
        });
    }

    uexNIMCase.addUserToBlackList = function() {
        //先确保用户不在blackList中
        var param = {
            roomId: 188398,
            //聊天室id
            userId: "user2",
            //用户的帐号
        };
        uexNIM.setNormal(param);
        var param = {
            roomId: 188398,
            //聊天室id
            userId: "user2",
            //用户的帐号
        };
        uexNIM.addUserToBlackList(param, cbHelper.baseCallback);
    }
    uexNIMCase.muteUser = function() {
        var param = {
            roomId: 188398,
            //聊天室id
            userId: "user2",
            //用户的帐号
        };
        uexNIM.setNormal(param);
        var param = {
            roomId: 188398,
            //聊天室id
            userId: "user2",
            //用户的帐号
        };
        uexNIM.muteUser(param, cbHelper.baseCallback);
    }
    uexNIMCase.setNormal = function() {
        var param = {
            roomId: 188398,
            //聊天室id
            userId: "user2",
            //用户的帐号
        };
        uexNIM.setNormal(param, cbHelper.baseCallback);
    }
    uexNIMCase.setAdmin = function() {
        UNIT_TEST.log('setAdmin 需要聊天室的创建者才有权限操作，188398创建者是appcanuser1');
        var param = {
            roomId: 188398,
            //聊天室id
            userId: "user2",
            //用户的帐号
        };
        uexNIM.setAdmin(param, cbHelper.baseCallback);
    }

    uexNIMCase.kickMemberFromChatRoom = function() {
        var param = {
            roomId: 188398,
            //聊天室id
            userId: "user2",
            //用户的帐号
            reason: "kick user2"
        };
        uexNIM.kickMemberFromChatRoom(param, cbHelper.baseCallback);
    }
    //---------------------------------- 用户资料托管----------------------------------
    uexNIMCase.userInfo = function() {
        var param = {
            userId: "user2",
        };
        cbHelper.success = function(data) {
            UNIT_TEST.log('data:' + JSON.stringify(data));
        }
        uexNIM.userInfo(param, cbHelper.baseCallback);
    }
    uexNIMCase.fetchUserInfos = function() {
        var param = {
            userIds: ["appcanuser1", "user1"],
        };
        cbHelper.success = function(data) {
            UNIT_TEST.log('data:' + JSON.stringify(data));
        }
        uexNIM.fetchUserInfos(param, cbHelper.baseCallback);
    }
    uexNIMCase.updateMyUserInfo = function() {
        var param = {
            nickname: "nickName" + new Date().getTime(),
        };
        uexNIM.updateMyUserInfo(param, cbHelper.baseCallback);
    }
    uexNIMCase.myFriends = function() {
        cbHelper.success = function(data) {
            UNIT_TEST.log('data:' + JSON.stringify(data));
        }
        uexNIM.myFriends(cbHelper.baseCallback);
    }
    uexNIMCase.requestFriend = function() {
        var param = {
            userId: "appcanuser1",
            operation: 2,
            message: "add a user"
        };
        uexNIM.requestFriend(param, cbHelper.baseCallback);
    }
    uexNIMCase.deleteFriend = function() {
        var param = {
            userId: "appcanuser1"
        };
        uexNIM.deleteFriend(param, cbHelper.baseCallback);
    }
    uexNIMCase.myBlackList = function() {
        var param = {
            userId: "appcanuser1"
        };
        cbHelper.success = function(data) {
            UNIT_TEST.log('data:' + JSON.stringify(data));
        }
        uexNIM.myBlackList(cbHelper.baseCallback);
    }
    uexNIMCase.addToBlackList = function() {
        var param = {
            userId: "user2"
        };
        uexNIM.addToBlackList(param, cbHelper.baseCallback);
    }
    uexNIMCase.isUserInBlackList = function() {
        var param = {
            userId: "user2"
        };
        cbHelper.success = function(data) {
            UNIT_TEST.log('is user2 in black list:' + data);
        }
        uexNIM.isUserInBlackList(param, cbHelper.baseCallback);
    }
    uexNIMCase.removeFromBlackBlackList = function() {
        var param = {
            userId: "user2"
        };
        uexNIM.removeFromBlackBlackList(param, cbHelper.baseCallback);
    }
    uexNIMCase.onBlackListChanged = function() {
        var param = {
            userId: "user2"
        };
        uexNIM.addToBlackList(param, cbHelper.baseCallback);
        var isExecute = false;
        var observer = new RootObserver("uexNIM.onBlackListChanged");
        observer.once(function() { //此处data是json string.
            if (!isExecute) {
                isExecute = true;

                UNIT_TEST.assertTrue(true);
            }
        });
    }

    uexNIMCase.myMuteUserList = function() {

        cbHelper.success = function(data) {
            UNIT_TEST.log('data:' + JSON.stringify(data));
        }
        uexNIM.myMuteUserList(cbHelper.baseCallback);
    }

    uexNIMCase.updateNotifyStateForUser = function() {
        var param = {
            userId: "user1",
            notify: true,
        };

        uexNIM.updateNotifyStateForUser(param, cbHelper.baseCallback);
    }

    uexNIMCase.notifyForNewMsgForUser = function() {
        var param = {
            userId: "user1"
        };
        uexNIM.notifyForNewMsgForUser(param, cbHelper.baseCallback);
    }
    uexNIMCase.logout = function() {
        uexNIM.logout(function(error) {
            if (!error) {
                UNIT_TEST.assert(true);
            } else {
                UNIT_TEST.assert(false);
            }
        });
    }

    UNIT_TEST.addCase("uexNIM", uexNIMCase);
});