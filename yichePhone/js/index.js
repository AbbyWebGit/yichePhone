var _this = {
    oldNum : -1,
    scroll: function() {
        console.log($('.hotCarsSort').scrollLeft());
        console.log(_this.oldNum);
        

        if (_this.oldNum == $('.hotCarsSort').scrollLeft()) {

            $('.hotCarsSort')[0].scrollLeft = 0;
            _this.oldNum = -1;
        } else {
            _this.oldNum = $('.hotCarsSort').scrollLeft();
            $('.hotCarsSort')[0].scrollLeft = $('.hotCarsSort').scrollLeft()+1;

        }
        requestAnimationFrame(_this.scroll);
    },
    changeTab: function(num) {
        var _cur = 0;
        var _list = $('#topTitleList a');
        //console.log(_list.length);

        for (var i = 0; i < _list.length; i++) {
            $(_list[i]).removeClass('cur');
            if ((num + 100) > $($(_list[i]).attr('data-id')).offset().top) {
                console.log($($(_list[i]).attr('data-id')));
                 console.log(num);
                _cur = i;
            }
        }
        $(_list[_cur]).addClass('cur');
    },
    showMore: function(node, moreNode) {
        var _curNum = node.attr('shownum');
        node.attr('shownum', Number(_curNum) + 4);
        if (_this.showLi(node)) {
            $(moreNode).hide();
        }
    },
    showLi: function(node) {
        var _curNum = Number(node.attr('shownum'));
        var _li = node.find('li');

        for (var j = 0; j < _li.length; j++) {
            $(_li[j]).show();
            if (j > _curNum) {
                $(_li[j]).hide();
            }
        }

        if ((_curNum + 1) >= _li.length) {
            return true;
        } else {
            return false;
        }
    },
    init: function() {
        var _ul = $('.feedList');
        for (var i = 0; i < _ul.length; i++) {
            var _showNum = 3;
            $(_ul[i]).attr('shownum', _showNum);
            _this.showLi($(_ul[i]));
        }
        requestAnimationFrame(_this.scroll);
    }
};
$(document).ready(function() {
    $('#topTitleList a').on('tap', function(e) {
        $('body')[0].scrollTop = $($(this).attr('data-id')).offset().top - 90;
    })
    $(document).on('scroll', function() {
        _this.changeTab($('body').scrollTop())
        //console.log($('body').scrollTop());
        //传入当前滚动条位置
    })
    $('.moreCars').on('tap', function() {
        _this.showMore($(this).parent().find('.feedList'), this)
    })

    _this.init()
});
