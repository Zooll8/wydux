import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { onSearch, newSearch, playTrack } from '../actions';

export function msToMS(ms) {
  const minutes = Math.floor(ms / 60000);
  let seconds = Math.floor(ms / 1000) % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  componentDidMount() {
    this.searchText.focus();
    document.getElementById('input').addEventListener('keydown', this.onEnter.bind(this), true);
  }
  onEnter(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      this.props.onSearch(this.searchText.value);
    }
  }
  tableTracks() {
    return (
      <table className="table table-striped table-hover">
        <thead>
            <tr>
                 <th />
                 <th>Artist:</th>
                 <th>Name:</th>
                 <th>Popularity:</th>
                 <th>Time:</th>
               </tr>
          </thead>
        <tbody>
            {this.props.tracks.map((item, index) => (

                 <tr key={index}>
        <td><button className="btn btn-xs btn-success" onClick={() => this.props.playTrack(item)}><i className="fa fa-play" aria-hidden="true" /></button></td>
        <td>{item.artists[0].name}</td>
        <td>{item.name}</td>
        <td className="tracks--table--progress"><div className="progress">
          <div className="progress-bar progress-bar-success" style={{ width: `${item.popularity}%` }} />
        </div>
        </td>
        <td>{msToMS(item.duration_ms)}</td>
      </tr>

                      )) }
          </tbody>
      </table>
    );
  }
  render() {
    return (
      <div className="col-right ">
              
        <div className="form-group">
          <input id='input' ref={(input) => { this.searchText = input; }} type="text" className="form-control search-bar" placeholder="Search tracks, albums and artists" />
        </div>
        <div className="page-store">
          
          {(this.props.albums) ? (<div className=" extra-margin-top "><h3 className="text-center">Albums:</h3><hr /></div>) : null}
          {(this.props.albums) ? this.props.albums.map(item => (
            <div className="track-card" key={item.id}>
              <Link className="card-link" to={`/album/${item.id}`}><img className="card-img" src={item.images[0] ? item.images[0].url : 'http://vignette3.wikia.nocookie.net/k-anime/images/6/60/No_Image_Available.png/revision/latest?cb=20130418072455'} />

                  <div className="overlay" /><div className="margin-around">{item.name}</div></Link>


            </div>
                      )) : null
              }
          <div className="clear-both" />
          {(this.props.artists) ? (<div className=" extra-margin-top "><h3 className="text-center extra-margin-top ">Artists:</h3><hr /></div>) : null}
          {(this.props.artists) ? this.props.artists.map(item => (
            <div className="track-card" key={item.id}>
              <Link className="card-link" to={`/artist/${item.id}`}><img className="card-img" src={item.images[0] ? item.images[0].url : 'http://vignette3.wikia.nocookie.net/k-anime/images/6/60/No_Image_Available.png/revision/latest?cb=20130418072455'} />

                  <div className="overlay" /><div className="margin-around">{item.name}</div></Link>


            </div>
                      )) : null
              }
          <div className="clear-both" />
          {(this.props.tracks) ? (<div className=" extra-margin-top "><h3 className="text-center extra-margin-top">Tracks:</h3><hr /></div>) : null}
          {(this.props.tracks) ? this.tableTracks() : null }
          {(this.props.tracks) ? <div><hr /><span className="my-name">
            <i className="fa fa-code" aria-hidden="true" /> with <i className="fa fa-heart" aria-hidden="true" /> by <a href="https://github.com/zooll8/wydux" target="_blank">Zaurbek Zhakupov</a>
          </span><span style={{float:'right'}}><a href='https://github.com/zooll8/wydux' target='_blank'>Github</a> </span></div> : null }

        </div>

      </div>
    );
  }
}

const HomeWrapped = connect(
    state => ({
      tracks: state.fetch.albums.items ? (state.fetch.tracks.items.length > 0 ? state.fetch.tracks.items : null) : null,
      artists: state.fetch.artists.items ? (state.fetch.artists.items.length > 0 ? state.fetch.artists.items : null) : null,
      playlists: state.fetch.albums.items ? (state.fetch.playlists.items.length > 0 ? state.fetch.playlists.items : null) : null,
      albums: state.fetch.albums.items ? (state.fetch.albums.items.length > 0 ? state.fetch.albums.items : null) : null,
    }),
    dispatch => ({
      onSearch: text => dispatch(newSearch(text)),
      playTrack: object => dispatch(playTrack(object)),
    }),
)(Home);

export default HomeWrapped
;
