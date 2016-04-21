var _this = {
    oldNum : -1,
    scroll: function() {
        //console.log($('.hotCarsSort').scrollLeft());
        //console.log(_this.oldNum);
        

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
                //console.log($($(_list[i]).attr('data-id')));
                 //console.log(num);
                _cur = i;
            }
        }
        $(_list[_cur]).addClass('cur');
    },


   showMore: function(node, moreNode) {
        var _curNum = node.attr('shownum');
        //全部加载
        node.attr('shownum', node.find('li').length);
        _this.showLi(node);
        $(moreNode).css({
            "visibility": "hidden",
            height: "0.4rem"
        });
        //全部加载end

        ////每次加载4个
        //node.attr('shownum', Number(_curNum) + 4);
        //if (_this.showLi(node)) {
        //    $(moreNode).css({
        //        "visibility": "hidden",
        //        height: "0.4rem"
        //    });
        //}
        ////每次加载4个end
    },
    showLi: function(node) {
        var _curNum = Number(node.attr('shownum'));
        var _li = node.find('li');
        if(_li.length<=(_curNum+1)){
            node.closest('[data-parent="landingPage"]').children("div.moreCars").css({
                "visibility": "hidden",
                height: "0.4rem"
            })
        }
        for (var j = 0; j < _li.length; j++) {
            $(_li[j]).show();
            if (j > _curNum) {
                $(_li[j]).hide();
            }
        }

        return (_curNum + 1) >= _li.length
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
    $('#topTitleList a').on('click', function(e) {
        $('body')[0].scrollTop = $($(this).attr('data-id')).offset().top - 90;
        e.preventDefault();
        return false;
    });
    $(document).on('scroll', function() {
        _this.changeTab($('body').scrollTop())
    });

    $('.moreCars').on('click', function(e) {
        _this.showMore($(this).parent().find('.feedList'), this);
        e.preventDefault();
        return false;
    });

    _this.init()
});