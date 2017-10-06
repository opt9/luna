import { ipcRenderer } from 'electron';
import React from 'react';
import Semver from 'semver-compare';

class PackageHeader extends React.Component {
  constructor(props) {
    super(props);
    this._needsUpdate = this._needsUpdate.bind(this);
    this._update = this._update.bind(this);
    this._install = this._install.bind(this);
    this._uninstall = this._uninstall.bind(this);
  }
  _needsUpdate() {
    let pkg = this.props.pkg,
      diff = 0;
    let latest = pkg['dist-tags'].latest;
    let installed = pkg.version;
    diff = Semver(latest, installed);
    return diff;
  }
  _install(e) {
    e.preventDefault();
    let pkg = this.props.pkg, version;
    this.props.showMessageBox({
      action: 'Install',
      name: pkg.name
    }, () => {
      this.props.setMode('global');
      ipcRenderer.send('install-package', {
        scope: 'g',
        pkgName: pkg.name,
        version: version || 'latest'
      });
    });
  }
  _uninstall(e) {
    e.preventDefault();
    let pkg = this.props.pkg, version;
    this.props.showMessageBox({
      action: 'Uninstall',
      name: pkg.name
    }, () => {
      this.props.setMode('global');
      ipcRenderer.send('uninstall-package', {
        scope: 'g',
        pkgName: pkg.name
      });
    });
  }
  _update(e) {
    e.preventDefault();
    let pkg = this.props.pkg, version;
    this.props.showMessageBox({
      action: 'Update',
      name: pkg.name
    }, () => {
      ipcRenderer.send('update-package', {
        scope: 'g',
        pkgName: pkg.name,
        version: version || 'latest'
      });
    });
  }
  componentDidMount() {
    ipcRenderer.on('uninstall-package-reply', (event, data) => {
      this.props.toggleLoader(true);
      ipcRenderer.send('get-packages', {
        scope: 'g'
      });
    });
    ipcRenderer.on('install-package-reply', (event, data) => {
      this.props.toggleLoader(true);
      ipcRenderer.send('get-packages', {
        scope: 'g'
      });
    });
    ipcRenderer.on('update-package-reply', (event, data) => {
      this.props.setActive(null);
      this.props.toggleLoader(true);
      ipcRenderer.send('get-packages', {
        scope: 'g'
      });
    });
  }
  render() {
    let pkg = this.props.pkg;
    if(!pkg) {
      return null;
    }
    return (
      <div className="flex-row" ref="root">
        <h1 className="ui header" style={{
          marginBottom: '0.25em'
        }}>
          {pkg.name}&nbsp;{pkg.version} - {this.props.mode}
          <div className="sub header">
            Latest:&nbsp;{pkg['dist-tags'].latest}&nbsp; {(this._needsUpdate())
              ? <a href="#" onClick={this._update}>Update</a>
              : ''}
          </div>
        </h1>
        {(this.props.mode !== 'search') ? <a className="button btn-red" href="#" onClick={this._uninstall}>Uninstall</a>
      : <a className="button btn-green" href="#" onClick={this._install}>Install</a>}
      </div>
    )
  }
}

export default PackageHeader;