/** @jsx React.DOM */

(function(){
  var _id = {
    cardCtn: 'card-content'
  };
  var coverImgPlaceholder = null;

  window.Card = React.createClass({
    getInitialState: function(){
      // 只在第一次渲染时init
      // 那么该如何控制每次渲染不同的数据呢...?
      // 如何直接通过组件对象,调用setState?
      return {
        man: window.fifData['chenllos'],
        who: 'chenllos'
      }
    },
    componentDidMount: function(){
      // console.log('jsx can not bind event');
      coverImgPlaceholder = $('#cover-img-placeholder');
      var self = this;
      $('.mate-list').on('click', '.mate-item', function(){
        $entry = $(this);
        var mateName = $entry.attr('data-id');
        showCard($entry, coverImgPlaceholder, self.state.who);
        self.handeEntryClick(mateName);
      });
    },
    handeEntryClick: function(mateName){
      this.setState( {
        man: window.fifData[mateName],
        who: mateName
      } );
    },

    // 不能直接返回两个并列的tag 必须是有个父节点包裹着```?
    render: function(){
      var self = this;
      var coverStyle={
        'background-image': 'url("'+self.state.man.cover.src+'")'
      };
      return (
        <div className="card-com">
          <CardText layoutClass="col three-fifth" man={this.state.man} />
          <CardCover layoutClass="col two-fifth" man={this.state.man} dataStyle={coverStyle}/>
        </div>
      );
    }
  });

  var CardText = React.createClass({
    render: function(){
      // var rawHTML = this.state.man.
      // {}里面写js表达式/变量
      return (
        <div className={"card-text "+this.props.layoutClass}>
          <h2>
            {this.props.man.name}
            <span>a.k.a: <span>{this.props.man.alias}</span></span>
          </h2>
          <ul></ul>
        </div>
      )
    }
  });


  var CardCover = React.createClass({
    render: function(){
      return (
        <div className={"card-cover "+this.props.layoutClass} style={this.props.dataStyle}>
          <img id="cover-img-placeholder" src={this.props.man.cover.src}/>
        </div>
      );
    }
  });

  React.renderComponent(
    <Card />,
    document.querySelector('#'+_id.cardCtn)
  );

})();