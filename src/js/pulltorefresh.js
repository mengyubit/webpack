
(function(window){
    const _defaults = {
        instructionsPullToRefresh: 'pull to refresh', // text
        instructionsReleaseToRefresh: 'Release to refresh', //text
        instructionsRefreshing: 'refreshing', // text
        threshold: 60, // minimum distance required to trigger the refresh.
        onPull: () => location.reload()
    };
    const offsetDownH = 90;
    let	_pullLengh = 0;
    let	_startLength = 0;
    let _ptrEle = '',_upEle='';
    let _ptrTextEle = '',_upTextEle='';
    let _element = '';
    let upOrDown = ''; //上拉还是下拉
    let scrollTop = '';
    let cfg = ''
    let pullToRefresh = {
        init: function(cfg){
            Object.keys(_defaults).forEach((key) => {
                cfg[key] = cfg[key] || _defaults[key];
            });
            _element = document.querySelector(cfg.targetElement);

            //下拉刷新
            _ptrEle = document.querySelector(cfg.ptrElement);
            _ptrTextEle = document.querySelector(cfg.ptrTextElement);

            //上拉刷新
            _upEle = document.querySelector(cfg.upElement);
            _upTextEle = document.querySelector(cfg.upTextElement);

            // init style

            _ptrEle.style.position = 'absolute';
            _upEle.style.position = 'absolute';

            _ptrTextEle.innerText = cfg.instructionsPullToRefresh;
            _upTextEle.innerText = cfg.instructionsPullToRefresh;

            // blind event
            _element.addEventListener('touchstart', function(event) {

                _startLength = event.touches[0].pageY;
                // _element.removeAttribute('style');
                _element.style['transition'] = 'transform 0s';
                // 'pull to refresh'
                _ptrTextEle.innerText = cfg.instructionsPullToRefresh;
                _upTextEle.innerText = cfg.instructionsPullToRefresh;
            });

            _element.addEventListener('touchmove', function(event) {
                _pullLengh = event.touches[0].pageY - _startLength;
                scrollTop = _element.scrollTop;
                // 下拉
                if(_pullLengh > 0 && scrollTop === 0){
                    upOrDown = 'down';
                    pullElement(_element, _pullLengh, cfg,'down');
                } else if(_pullLengh < 0 && ( scrollTop+_element.offsetHeight ) > _upEle.offsetTop ) { //上拉
                    upOrDown = 'up';
                    _upEle.style.visibility = 'visible';
                    pullElement(_element, -(_pullLengh), cfg, 'up');
                }
            });

            _element.addEventListener('touchend', function() {
                if(upOrDown === 'down') {
                    if(_pullLengh > cfg.threshold){
                        cfg.onPull();
                    }
                } else if(upOrDown === 'up'){
                    if(-(_pullLengh) > cfg.thresholdUp){
                        cfg.onPullUp();
                    }
                }
            });
        },

        //请求后，复位上拉或者下拉组件
        restore: function(){
            if(upOrDown=== 'up') {
                // 'refreshing'
                _ptrTextEle.innerText = cfg.instructionsRefreshing;
                _ptrEle.style['height'] = 0;
            } else {
                // 'refreshing'
                _upTextEle.innerText = cfg.instructionsRefreshing;
                _upEle.style.visibility = 'hidden';
            }
            _pullLengh = 0;
            _element.style['transition'] = 'transform 0.6s ease';
            _element.style['transform'] = 'translate(0, 0px)';
            upOrDown = '';
        }
    };

    //上拉或者下拉文案提示
    let pullElement = function(element, length, cfg, upOrDown){
        //下拉
        if(upOrDown === 'down') {
            if(length < offsetDownH){
                element.style['transform'] = 'translate(0, ' + length + 'px)';
                _ptrEle.style['height'] = length+ 'px';
                if(length > cfg.threshold){
                    // 'release to fresh'
                    _ptrTextEle.innerText = cfg.instructionsReleaseToRefresh;
                } else {
                    _ptrTextEle.innerText = cfg.instructionsPullToRefresh;
                }
            }
        } else if(upOrDown === 'up'){ //上拉
            if(length < _upEle.offsetHeight){
                element.style['transform'] = 'translate(0, ' - length + 'px)';
                if(length > cfg.thresholdUp){
                    // 'release to fresh'
                    _upTextEle.innerText = cfg.instructionsReleaseToRefresh;
                }
            }
        }

    };
    window.pullToRefresh = pullToRefresh;
})(window);