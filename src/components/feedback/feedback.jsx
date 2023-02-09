import css from '../feedback/feedback.module.css';
import React, { Component } from 'react';
import { ListButton } from './listButton';

export class Feedback extends Component {
  static defaultProps = {
    good: 0,
    netural: 0,
    bad: 0,
    total: 0,
    positiveFeedback: 0,
    visible: false,
  };

  state = {
    good: this.props.good,
    netural: this.props.netural,
    bad: this.props.bad,
    total: this.props.total,
    positiveFeedback: this.props.positiveFeedback,
    visible: this.visible,
  };

  show = () => {
    this.setState({
      visible: true,
    });
  };

  goodHendler = () => {
    this.setState(prevState => ({
      good: prevState.good + 1,
    }));
    this.totalHendler();
    this.show();
  };

  neturalHendler = () => {
    this.setState(prevState => ({
      netural: prevState.netural + 1,
    }));
    this.totalHendler();
    this.show();
  };

  badHendler = () => {
    this.setState(prevState => ({
      bad: prevState.bad + 1,
    }));
    this.totalHendler();
    this.show();
  };

  totalHendler = () => {
    this.setState(prevState => ({
      total: (prevState.total =
        prevState.netural + prevState.good + prevState.bad),
    }));
    this.positiveFeedback();
  };

  positiveFeedback = () => {
    this.setState(prevState => ({
      positiveFeedback: (prevState.positiveFeedback = Math.round(
        (prevState.good / prevState.total) * 100
      )),
    }));
  };

  render() {
    return (
      <div className={css.container}>
        <h2 className={css.title}>Please leave feedback</h2>
        <h3 className={css.title__text}>Statistics</h3>
        <ListButton
          goodHendler={this.goodHendler}
          neturalHendler={this.neturalHendler}
          badHendler={this.badHendler}
        />
        {this.state.visible ? (
          <ul className={css.list__text}>
            <li className={css.list__text__item}>
              <p>
                Good: <span className={css.span__text}>{this.state.good}</span>
              </p>
            </li>
            <li className={css.list__text__item}>
              <p>
                Neutral:
                <span className={css.span__text}>{this.state.netural}</span>
              </p>
            </li>
            <li className={css.list__text__item}>
              <p>
                Bad:<span className={css.span__text}>{this.state.bad}</span>
              </p>
            </li>
            <li className={css.list__text__item}>
              <p>
                Total:
                <span className={css.span__text__red}>{this.state.total}</span>
              </p>
            </li>
            <li className={css.list__text__item}>
              <p>
                Positive feedback:
                <span className={css.span__text__red}>
                  {this.state.positiveFeedback}%
                </span>
              </p>
            </li>
          </ul>
        ) : (
          <p className={css.text__message}>There is no feedback</p>
        )}
      </div>
    );
  }
}
