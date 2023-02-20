export default function getPositions(players) {
    if (players === 2) {
        return ({
                desktop: [
                    {
                        player: {
                            right: '-85px',
                            top: 0,
                            bottom: 0,
                            marginTop: 'auto',
                            marginBottom: 'auto',
                        },
                        cards: ['translate(690px, -76px) rotate(10deg)', 'translate(660px, -65px) rotate(-10deg)'],
                        info: 'bottom',
                        position: 'right'
                    }, {
                        player: {
                            left: '-85px',
                            top: 0,
                            bottom: 0,
                            marginTop: 'auto',
                            marginBottom: 'auto',
                        },
                        cards: ['translate(-30px, -80px) rotate(10deg)', 'translate(-60px, -70px) rotate(-10deg)'],
                        info: 'bottom',
                        position: 'left'
                    }
                ],
                phone: [
                    {
                        player: {
                            right: '-45px',
                            top: 0,
                            bottom: 0,
                            marginTop: 'auto',
                            marginBottom: 'auto',
                        },
                        cards: ['translate(277px, -44px) rotate(10deg)', 'translate(257px, -34px) rotate(-10deg)'],
                        info: 'bottom',
                        position: 'right'
                    }, {
                        player: {
                            left: '-45px',
                            top: 0,
                            bottom: 0,
                            marginTop: 'auto',
                            marginBottom: 'auto',
                        },
                        cards: ['translate(-16px, -44px) rotate(10deg)', 'translate(-36px, -34px) rotate(-10deg)'],
                        info: 'bottom',
                        position: 'left'
                    }
                ]
            }
        )
    }
    if (players === 5) {
        return ({
            desktop: [
                {
                    player: {
                        right: '-85px',
                        top: 0,
                        bottom: 0,
                        marginTop: 'auto',
                        marginBottom: 'auto',
                    },
                    cards: ['translate(690px, -76px) rotate(10deg)', 'translate(660px, -65px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'left'
                },
                {
                    player: {
                        right: '30px',
                        bottom: '-70px'
                    },
                    cards: ['translate(645px, 168px) rotate(10deg)', 'translate(615px, 178px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'top'

                },
                {
                    player: {
                        left: 0,
                        right: 0,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        bottom: '-85px',
                        zIndex: 1,
                    },
                    cards: ['translate(320px, 170px) rotate(10deg)', 'translate(290px, 188px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'top',

                },
                {
                    player: {
                        left: '30px',
                        bottom: '-70px',
                    },
                    cards: ['translate(-10px, 168px) rotate(10deg)', 'translate(-40px, 178px) rotate(-10deg)'], 
                    info: 'bottom',
                    position: 'top'

                },
                {
                    player: {
                        left: '-85px',
                        top: 0,
                        bottom: 0,
                        marginTop: 'auto',
                        marginBottom: 'auto'
                    },
                    cards: ['translate(-30px, -80px) rotate(10deg)', 'translate(-60px, -70px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'right'
                },

            ],
            phone: [
                {
                    player: {
                        top: '120px ',
                        right: '-46px '
                    },
                    cards: ['translate(277px, -125px) rotate(10deg)', 'translate(257px, -115px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'right'
                },
                {
                    player: {
                        top: '340px ',
                        right: '-46px '
                    },
                    cards: ['translate(277px, 96px) rotate(10deg)', 'translate(257px, 106px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'top'

                },
                {
                    player: {
                        bottom: '-50px',
                        left: 0,
                        right: 0,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    },
                    cards: ['translate(133px, 310px) rotate(10deg)', 'translate(113px, 323px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'bottom'

                },
                {
                    player: {
                        top: '120px',
                        left: '-46px '
                    },
                    cards: ['translate(-16px, 96px) rotate(10deg)', 'translate(-36px, 106px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'bottom'

                },
                {
                    player: {
                        top: '340px',
                        left: '-46px '
                    },
                    cards: ['translate(-16px, -125px) rotate(10deg)', 'translate(-36px, -115px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'left'
                }

            ]
        })


    } 
    else {
        return {
            desktop: [
                {
                    player: {
                        right: '80px',
                        top: '-85px',
                    },
                    cards: ['translate(530px, -260px) rotate(10deg)', 'translate(500px, -250px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'top'
                },
                {
                    player: {
                        right: '-60px',
                        top: '30px',
                    },
                    cards: ['translate(674px, -156px) rotate(10deg)', 'translate(644px, -146px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'right'
                },
                {
                    player: {
                        right: '-53px',
                        bottom: '-10px'
                    },
                    cards: ['translate(735px, 110px) rotate(10deg)', 'translate(705px, 120px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'bottom'
                },
                {
                    player: {
                        right: '150px',
                        bottom: '-85px'
                    },
                    cards: ['translate(458px, 290px) rotate(10deg)', 'translate(428px, 300px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'bottom'
                },
                {
                    player: {
                        left: '150px',
                        bottom: '-85px'
                    },
                    cards: ['translate(200px, 290px) rotate(10deg)', 'translate(170px, 300px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'bottom'
                },
                {
                    player: {
                        left: '-53px',
                        bottom: '-10px'
                    },
                    cards: ['translate(-90px, 110px) rotate(10deg)', 'translate(-120px, 120px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'left'
                },
                {
                    player: {
                        left: '-60px',
                        top: '30px',
                    },
                    cards: ['translate(-20px, -156px) rotate(10deg)', 'translate(-50px, -146px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'left'
                },
                {
                    player: {
                        left: '80px',
                        top: '-85px'
                    },
                    cards: ['translate(130px, -260px) rotate(10deg)', 'translate(100px, -250px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'top'
                },
            ],
            phone: [
                {
                    player: {
                        right: '0px',
                        top: '0px',
                    },
                    cards: ['translate(231px, -245px) rotate(10deg)', 'translate(211px, -235px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'top'
                },
                {
                    player: {
                        right: '-45px',
                        top: '140px',
                    },
                    cards: ['translate(274px, -106px) rotate(10deg)', 'translate(254px, -96px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'right'

                },
                {
                    player: {
                        right: '-45px',
                        bottom: '110px',
                    },
                    cards: ['translate(274px, 50px) rotate(10deg)', 'translate(254px, 60px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'right'

                },
                {
                    player: {
                        right: '20px',
                        bottom: '-20px',
                    },
                    cards: ['translate(260px, 223px) rotate(10deg)', 'translate(240px, 233px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'bottom'

                },
                {
                    player: {
                        left: '20px',
                        bottom: '-20px',
                    },
                    cards: ['translate(-12px, 223px) rotate(10deg)', 'translate(-32px, 233px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'bottom'
                },
                {
                    player: {
                        left: '-45px',
                        bottom: '110px',
                    },
                    cards: ['translate(-5px, 50px) rotate(10deg)', 'translate(-35px, 60px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'left'
                },
                {
                    player: {
                        left: '-45px',
                        top: '140px',
                    },
                    cards: ['translate(-5px, -106px) rotate(10deg)', 'translate(-35px, -96px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'left'

                },
                {
                    player: {
                        left: '0',
                        top: '0',
                    },
                    cards: ['translate(40px, -245px) rotate(10deg)', 'translate(10px, -235px) rotate(-10deg)'],
                    info: 'bottom',
                    position: 'top'
                },
            ]
        }
    }
}
