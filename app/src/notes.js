var Notes=React.createClass({
  
  getInitialState:function() {
    return ({editing:false});
  },
  componentWillMount:function() {
    this.style = {
      right:this.randomBetween(0,window.innerWidth-200)+'px',
      top:this.randomBetween(0,window.innerHeight-200)+'px',
      transform:'rotate('+this.randomBetween(-15,15)+'deg)'
    }
  },
  randomBetween(min,max){
    return (min+Math.ceil(Math.random()*max));
  },
  edit(){
    this.setState({editing:true});
  },
  save(){
    this.props.onChange(this.refs.newtext.getDOMNode().value,this.props.index);
    this.setState({editing:false});
  },
  delete(){
    this.props.onRemove(this.props.key);
    this.setState({editing:false});
  },
  renderDisplay(){
    return (<div className="demo-card-wide mdl-card mdl-shadow--2dp" style={this.style}>
    <div className="mdl-card__supporting-text">
    {this.props.children}
    </div>
    <div className="mdl-card__actions mdl-card--border">
    <button onClick={this.edit} className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
    <i className="material-icons">border_color</i>
    </button>
    <button onClick={this.delete} className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
    <i className="material-icons">delete_forever</i>
    </button>
    </div>
    </div>);
  },
  renderform(){
    return (<div className="note" style={this.style}>
    <textarea ref="newtext" className="textdecor" defaultValue={this.props.children}></textarea>
    <button onClick={this.save} className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
    <i className="material-icons">save</i>
    </button>
    </div>
  )

},
render:function(){
  if(this.state.editing)
  {
    return this.renderform();
  }
  else {
    return this.renderDisplay();
  }
}
});

var Board=React.createClass({
  getInitialState:function(){
    return {
      notes:[]
    }
  },
  add:function(text){
    var arr=this.state.notes;
    arr.push({
      id:this.nextid(),
      note:text
    });
    this.setState({notes:arr});
  },
  update:function(newtext,i){
    var arr=this.state.notes;
    console.log("state",arr)
    arr[i].note=newtext;
    this.setState({notes:arr});
  },
  remove:function(i){
    var arr=this.state.notes;
    arr.splice(i,1);
    this.setState({notes:arr});
  },
  eachnote:function(note,i){
    return (<Notes key={note.i}
      index={i}
      onChange={this.update}
      onRemove={this.remove}>{note.note}</Notes>);
    },
    nextid(){
      this.uniqueid=this.uniqueid || 0;
      return this.uniqueid++;
    },
    render:function(){
      return(<div className="board">
      {this.state.notes.map(this.eachnote)}
      <button onClick={this.add.bind(null,"New Note")} className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
      <i className="material-icons">add</i>
      </button>
      </div>);
    }
  });


  React.render(<Board />,document.getElementById('react-container'));
