import '../lib/zepto';
import './pulltorefresh.js';
console.log(pullToRefresh);

function stopDrop() {
    var lastY;//最后一次y坐标点
    $(document.body).on('touchstart', function(event) {
        lastY = event.touches[0].pageY;//点击屏幕时记录最后一次Y度坐标。
    });
    $(document.body).on('touchmove', function(event) {

        var y = event.touches[0].pageY;
        var st = $(this).scrollTop(); //滚动条高度
        if (y >= lastY && st <= 10) {//如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
            lastY = y;
            event.preventDefault();
        }
        lastY = y;

    });
}

stopDrop();

pullToRefresh.init({
    // required
    ptrElement: '#ptr-instructions', // 'pull to refresh' intructions element
    ptrTextElement: '.ptr-instructions-text', // intructions' text element
    targetElement: '#main', // target element that will be dragged and refreshed

    // optional
    instructionsPullToRefresh: 'pull to refresh', // text
    instructionsReleaseToRefresh: 'Release to refresh', //text
    instructionsRefreshing: 'refreshing', // text
    threshold: 60, // minimum distance required to trigger the onPull callback
    thresholdUp: 30, // minimum distance required to trigger the onPull callback

    upElement:'#up-instructions',
    upTextElement:'.up-instructions-text',

    onPull: function(){ // callback fn
        // alert('onPull fired');
        let contentCt = document.getElementById('content');
        let newItem=document.createElement("DIV")
        let textnode=document.createTextNode("pullDown");
        newItem.appendChild(textnode);
        newItem.className='item';
        document.getElementById('content').insertBefore(newItem,contentCt.childNodes[0]);
    },

    onPullUp: function(){
        let contentCt = document.getElementById('content');
        let newItem=document.createElement("DIV")
        let textnode=document.createTextNode("pullUp");
        newItem.appendChild(textnode);
        newItem.className='item';
        document.getElementById('content').appendChild(newItem,contentCt.childNodes[0]);
    }
});
