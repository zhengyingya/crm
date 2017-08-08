<template>
  <div class="year-chart-show flex-row">
      <echart :options="option"></echart>
  </div>
</template>

<script>
import Panel from '../Panel.vue';
import { mapState } from 'vuex';

export default {
    name: 'yearChartShow',
    components: {
        Panel
    },
    props: [
        'barDataList',
        'barItemList'
    ],
    data () {
        return {
        }
    },
    computed: {
        ...mapState({
            monthlyAssistantPlanInfo: (state) => {
                return state.achievement.monthlyAssistantPlanInfo;
            },
            monthlyPrincipalPlanInfo: (state) => {
                return state.achievement.monthlyPrincipalPlanInfo
            }
        }),
        option: function () {
            return {
                tooltip : {
                    show: false,
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    show: false,
                    data: []
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '7%',
                    containLabel: true
                },
                xAxis:  {
                    show: false,
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: this.barItemList,
                    nameTextStyle: {
                        fontStyle: 'italic'
                    },
                    boundaryGap: ['5%', '10%'],
                    axisLine: {
                        lineStyle: {
                            width: 2,
                            color: '#26a2ff',
                            shadowColor: '#ECF5FF',
                            shadowOffsetX: 2
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = [
                              '#1790cf','#1bb2d8','#99d2dd','#88b0bb'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                series: [
                    {
                        name: '',
                        type: 'bar',
                        stack: '',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: this.barDataList
                    }
                ]
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';
.year-chart-show {
    width: 100%;
    .echarts {
        width: 100%;
        padding: 0 pxToRem(10px);
        height: pxToRem(150px);
    }
}
</style>
