import {useEffect, useState} from 'react'
import variables from "../../../../variables";
import Chart from 'react-apexcharts'
import styles from './styles.module.sass'

const options = {
    chart: {
        height: 343,
        type: "area",
        toolbar: {
            show: false
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: [0, 1, 2],
            top: 0,
            left: 0,
            blur: 5,
            color: variables.colors.base,
            opacity: 1
        }
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: [variables.colors.base],
        width: 5,
        dashArray: 0,
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.4,
            opacityTo: 0.00,
            stops: [20, 95]
        }
    },
    xaxis: {
        tooltip: {
            enabled: false
        },
        categories: ["Apr", "Aug", "Jul", "Jun", "Mar", "May", "Oct", "Sep"],
        labels: {
            show: true,
            align: 'center',
            minWidth: 0,
            maxWidth: 160,
            minHeight: 40,
            style: {
                fontSize: '10px',
                colors: '#A3A3A3',
            },
        },
        axisBorder: {
            show: true,
            color: 'white',
            offsetX: 0
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: [{
        axisBorder: {
            show: true,
            color: 'white',
            offsetX: 0
        },

        labels: {
            show: true,
            align: 'center',
            minWidth: 0,
            maxWidth: 160,
            style: {
                fontSize: '10px',
                colors: '#A3A3A3'
            },
        },
    }],
    grid: {
        show: false,
        borderColor: '#EBEEF2',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
            lines: {
                show: true,
            }
        },
        row: {
            colors: undefined,
            opacity: 0.5
        },
        column: {
            colors: undefined,
            opacity: 0.5
        },
        yaxis: {
            lines: {
                show: true,
            }
        },
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 14
        },
    },
    colors: [variables.colors.base, 'transparent'],
    dataLabels: {
        enabled: false,
        dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 1,
            opacity: 0.45
        }
    },
    markers: {
        size: 0,
        colors: '#F48E93',
        strokeColors: '#fff',
        strokeWidth: 0,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        onDblClick: undefined,
        showNullDataPoints: true,
        hover: {
            size: 10.,
            sizeOffset: 3
        }
    },
    tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: false,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        theme: true,
        style: {
            fontSize: '12px',
            fontFamily: undefined,
            backgroundColor: variables.colors.bgDark
        },
        onDatasetHover: {
            highlightDataSeries: false,
        },
        x: {
            formatter: undefined,
        },
        y: {
            formatter: undefined,
            title: {
                formatter: (seriesName) => '',
            },
        },
        z: {
            formatter: undefined,
            title: 'Size: '
        },
        marker: {
            show: false,
        },
        items: {
            display: 'flex',
        },
        fixed: {
            enabled: false,
            position: 'topRight',
            offsetX: 0,
            offsetY: 0,
        },
    },
    responsive: [
        {
            breakpoint: 767,
            options: {
                chart: {
                    height: 300
                }
            }
        },
        {
            breakpoint: 1200,
            options: {
                chart: {
                    height: 550
                }
            }
        }
    ]
}

const AceChart = (props) => {
    const [data, setData] = useState([])

    useEffect(() => {
        //fetch data from the server
        if (props.type === 'STAKED_BALANCE')
            setData([20, 30, 40, 50, 40, 30, 20, 10])
        else setData([50, 40, 60, 70, 50, 40, 30, 10])

    }, [props.type])

    const series = [{
        name: 'series-1',
        data
    }]


    return (
        <div style={{
            position: 'relative'
        }}>
            <div className={styles.container}>
                <span className={styles.title}>ACE</span>
                <span className={styles.price}>$46.00</span>
            </div>
            <Chart options={options} series={series} type="area" width={'100%'} height={460}/>

        </div>
    )
}

export default AceChart;