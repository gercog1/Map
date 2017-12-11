import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'reactstrap';
import react from '../../images/react.png';

import Widget from '../../components/Widget';

import s from './Dashboard.scss';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      words: [
        {
          name: 'word1',
          tags: [{
            name: 'tag1',
            isClicked: false
          },
            {
              name: 'tag2',
              isClicked: false
            },
            {
              name: 'tag3',
              isClicked: false
            }]
        },
        {
          name: 'word2',
          tags: [{
            name: 'tag1',
            isClicked: false
          },
            {
              name: 'tag2',
              isClicked: false
            }]
        },
        {
          name: 'word3',
          tags: [{
            name: 'tag1',
            isClicked: true
          }]
        }

      ],
      i: 0
    }
    this.nextWord = this.nextWord.bind(this);
    this.onTagClick = this.onTagClick.bind(this);
  }

  nextWord(){
    if(this.state.i > this.state.words.length - 2 ){
      this.setState({i: 0});
    }
    else this.setState({i: this.state.i + 1})
  }

  onTagClick(i,index){

    let a = this.state.words.slice();
    a[i].tags[index].isClicked = !a[i].tags[index].isClicked;
    this.setState({words: a});
  }


  render() {
    const {words, i} = this.state;
    return (
      <div className={s.root}>
        <h1>{words[i].name}</h1>
        <div>
          {
            words[i].tags.map((tag,index)=> <div onClick={()=>this.onTagClick(i,index)} className={
              tag.isClicked ? s.taggedbtn : s.tagbtn}
                                                 key={index}><p>{tag.name}</p></div>)
          }
        </div>
        <button className={s.nextbtn} onClick={this.nextWord} >NEXT</button>

      </div>
    );
  }
}

export default withStyles(s)(Dashboard);
