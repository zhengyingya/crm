<template>
  <div class="chart-show flex-row">
      <!--一栏显示-->
      <!-- <div class="left">
          <div class="it1 fs-14">{{text}}</div>
          <div class="it2 fs-22">
              {{percent}}%
          </div>
      </div>
      <div class="flex-cloumn right">
          <echart :options="option"></echart>
      </div> -->

      <!--半栏显示-->
      <div class="left">
          <div class="it1 fs-14">{{text}}</div>
          <div class="flex-cloumn right">
              <echart :options="option"></echart>
          </div>
      </div>
  </div>
</template>

<script>
import Panel from '../Panel.vue';
export default {
    name: 'chartShow',
    components: {
        Panel
    },
    props: [
        'text',
        'percent'
    ],
    data () {
        return {

        }
    },
    computed: {
        option: function () {
            return {
                title: {
                    text: this.percent + '%',
                    x: 'center',
                    y: 'center',
                    itemGap: 20,
                    textStyle : {
                        color : '#26a2ff',
                        // fontFamily : '微软雅黑',
                        fontSize : this.percent && this.percent.toString().length > 4 ? 12 : 16,
                        // fontWeight : 'bolder'
                    }
                },
                tooltip: {
                    show: false,
                    trigger: 'none',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    show: false,
                    orient: 'vertical',
                    x: 'left',
                    data: []
                },
                grid: {
                    bottom: '1%',
                    top: '1%'
                },
                color: ['#1790cf','#C4E1FF'],
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        center: ['50%', '50%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:this.percent, name:''},
                            {value:parseInt(this.percent)>100?0:100-parseInt(this.percent), name:''}
                        ]
                    }
                ]
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';
.chart-show {
    width: 100%;
    .head {
        display: flex;
    }
    .left {
        flex: 1;
        line-height: pxToRem(100px);
        text-align: center;
        .it1 {
            // height: pxToRem(50px);
            // line-height: pxToRem(60px);
            height: pxToRem(30px);
            line-height: pxToRem(40px);
        }
        .it2 {
            height: pxToRem(50px);
            line-height: pxToRem(30px);
            color: #26a2ff;
        }
        > i {
            color: #26a2ff;
        }
    }
    .right {
        flex: 1;
        text-align: left;
        height: pxToRem(100px);
        // padding-top: pxToRem(5px);
        box-sizing: border-box;
    }
    .echarts {
        width: 100%;
        height: pxToRem(100px);
    }
}
</style>
