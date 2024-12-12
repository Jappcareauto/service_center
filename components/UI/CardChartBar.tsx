import React from "react";
import Chart from "chart.js";

const CardChartBar = (props: { subTitle: string, maxWidth: string, height: string, data: number[] }) => {
    React.useEffect(() => {
        const config = {
            type: "bar",
            data: {
                labels: [
                    "Mon",
                    "Tue",
                    "Wen",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun",
                ],
                datasets: [
                    {
                        label: new Date().getFullYear(),
                        fill: false,
                        backgroundColor: "#FB7C37",
                        borderColor: "#FB7C37",
                        data: props.data,
                        barThickness: 30,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: "Orders Chart",
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                legend: {
                    display: false,
                    labels: {
                        fontColor: "rgba(0,0,0)",
                    },
                    align: "end",
                    position: "bottom",
                },
                scales: {
                    xAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "",
                            },
                            gridLines: {
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: "rgba(255, 255, 255)",
                                zeroLineColor: "rgba(255, 255, 255)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            display: false,
                            scaleLabel: {
                                display: false,
                                labelString: "Value",
                            },
                            gridLines: {
                                borderDash: [0],
                                drawBorder: true,
                                borderDashOffset: [2],
                                color: "rgba(255, 255, 255)",
                                zeroLineColor: "rgba(0, 0, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };

        const ctx: HTMLCanvasElement | null = document.querySelector("canvas#bar-chart")

        if (ctx) {
            ctx.getContext("2d");
            //@ts-expect-error "CHart js"
            window.myBar = new Chart(ctx, config);
        }
    }, [props.data])
    return (
        <>
            <div className={"flex flex-col border border-neutral   w-full justify-between max-w-[360px] pt-[16px] px-[24px] pb-[24px] max-md:min-h-24 rounded-[20px]  h-[180px]  " + props.maxWidth}>
                <div className="rounded-t mb-0 bg-transparent">
                    <div className="flex items-center justify-end">
                        <span className="p-2 px-3 text-sm text-neutral-light rounded-full bg-neutral">{props.subTitle}
                        </span>
                    </div>
                </div>
                <div className=" flex-auto w-full">
                    <div className="relative w-full ">
                        <canvas id="bar-chart" style={{ height: "100%", width: "100%" }}></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardChartBar