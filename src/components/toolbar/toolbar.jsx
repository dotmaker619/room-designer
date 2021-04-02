import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdSettings, MdUndo, MdDirectionsRun } from 'react-icons/md';
import { FaFile, FaMousePointer, FaPlus } from 'react-icons/fa';
import ToolbarButton from './toolbar-button';
import ToolbarSaveButton from './toolbar-save-button';
import ToolbarLoadButton from './toolbar-load-button';
import If from '../../utils/react-if';
import {
  MODE_IDLE,
  MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON,
  MODE_VIEWING_CATALOG,
  MODE_CONFIGURING_PROJECT
} from '../../constants';
import * as SharedStyle from '../../shared-style';
import LogoImg from './assets/img/logo.png';
import Logo1 from './assets/img/001.svg';
import Logo2 from './assets/img/002.svg';
import Logo3 from './assets/img/003.svg';
import Logo4 from './assets/img/004.svg';
import Logo3D from './assets/img/005.svg';
import LogoCal from './assets/img/006.svg';
import LogoOpen from './assets/img/007.svg';
import LogoSave from './assets/img/008.svg';
import LogoHelp from './assets/img/009.svg';



const iconTextStyle = {
  fontSize: '19px',
  textDecoration: 'none',
  fontWeight: 'bold',
  margin: '0px',
  userSelect: 'none'
};

const Icon2D = ( {style} ) => <p style={{...iconTextStyle, ...style}}>2D</p>;
const Icon3D = ( {style} ) => <p style={{...iconTextStyle, ...style}}>3D</p>;

const ASIDE_STYLE = {
  // backgroundColor: SharedStyle.PRIMARY_COLOR.toolbar,
  padding: '30px',
  width: '81px',
  height: '100%',
  background: 'linear-gradient(rgba(47,104,172,1) 0%, rgba(8,15,105,1) 100%)'
};

const sortButtonsCb = (a, b) => {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

const mapButtonsCb = (el, ind) => {
  return (
    <If
      key={ind}
      condition={el.condition}
      style={{ position: 'relative' }}
    >
      {el.dom}
    </If>
  );
};

export default class Toolbar extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.state.mode !== nextProps.state.mode ||
      this.props.height !== nextProps.height ||
      this.props.width !== nextProps.width ||
      this.props.state.alterate !== nextProps.state.alterate;
  }

  render() {

    let {
      props: { state, width, height, toolbarButtons, allowProjectFileSupport },
      context: { projectActions, viewer3DActions, translator, appSetActions }
    } = this;

    let mode = state.get('mode');
    let alterate = state.get('alterate');
    let alterateColor = alterate ? SharedStyle.MATERIAL_COLORS[500].orange : '';
    

    let sorter = [
      {
        index: 0, condition: allowProjectFileSupport, dom: <ToolbarButton
          active={false}>
          <img src={LogoImg} />
        </ToolbarButton>
      },
      
      {
        index: 1, condition: allowProjectFileSupport, dom: <ToolbarButton
        active={false}
        tooltip={translator.t('Width Tool')}
        onClick={event =>{ 
          appSetActions.selectToolbar(1);
        // confirm(translator.t('Would you want to start a new Project?')) ? projectActions.newProject() : null
        }}>
          <img src={Logo1} />
        </ToolbarButton>
      },
      {
        index: 2, condition: allowProjectFileSupport, dom: <ToolbarButton
        active={false}
        tooltip={translator.t('Elements on layer default')}
        onClick={event => {
          appSetActions.selectToolbar(2);
          // confirm(translator.t('Would you want to start a new Project?')) ? projectActions.newProject() : null;
        }}>
        <img src={Logo2} />
        </ToolbarButton>
      },
      {
        index: 3, condition: allowProjectFileSupport, dom: <ToolbarButton
          active={false}>
          <img src={Logo3} />
        </ToolbarButton>
      },
      {
        index: 4, condition: allowProjectFileSupport, dom: <ToolbarButton
          active={false}>
          <img src={Logo4} />
        </ToolbarButton>
      },
      {
        index: 5, condition: true,
        dom: <ToolbarButton
        active={[MODE_VIEWING_CATALOG].includes(mode)}
        // tooltip={translator.t('Open catalog')}
        onClick={event => projectActions.openCatalog()}>
          {/* <FaPlus /> */}
        </ToolbarButton>
      },
      {
        index: 6, condition: true, dom: <ToolbarButton
          active={[MODE_3D_VIEW].includes(mode)}
          tooltip={translator.t('3D View')}
          onClick={event => viewer3DActions.selectTool3DView()}>
          <img src={Logo3D} />
        </ToolbarButton>
      },
      {
        index: 7, condition: true, dom: <ToolbarButton
          active={[MODE_IDLE].includes(mode)}
          tooltip={translator.t('2D View')}
          onClick={event => projectActions.setMode( MODE_IDLE )}>
          {[MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode) ? <Icon2D style={{color: alterateColor}} /> : <FaMousePointer style={{color: alterateColor}} />}
        </ToolbarButton>
      },
      
      {
        index: 8, condition: allowProjectFileSupport,
        dom: <ToolbarSaveButton state={state} />
      },
      {
        index: 9, condition: allowProjectFileSupport,
        dom: <ToolbarLoadButton state={state} />
      },
      {
        index: 10, condition: true, dom: <ToolbarButton
          active={[MODE_CONFIGURING_PROJECT].includes(mode)}
          tooltip={translator.t('Configure project')}
          onClick={event => projectActions.openProjectConfigurator()}>
           <img src={LogoHelp} />
        </ToolbarButton>
      },
      {
        index: 11, condition: true, dom: <ToolbarButton
          active={false}
          tooltip={translator.t('Undo (CTRL-Z)')}
          onClick={event => projectActions.undo()}>
          <MdUndo />
        </ToolbarButton>
      },
      {
        index: 12, condition: true, dom: <ToolbarButton
          active={[MODE_CONFIGURING_PROJECT].includes(mode)}
          tooltip={translator.t('Configure project')}
          onClick={event => projectActions.openProjectConfigurator()}>
          <MdSettings />
        </ToolbarButton>
      },
      {
        index: 13, condition: true, dom: <ToolbarButton
          active={[MODE_3D_FIRST_PERSON].includes(mode)}
          tooltip={translator.t('3D First Person')}
          onClick={event => projectActions.newProject()}>
          <MdDirectionsRun />
        </ToolbarButton>
      }

    ];
    

    sorter = sorter.concat(toolbarButtons.map((Component, key) => {
      return Component.prototype ? //if is a react component
        {
          condition: true,
          dom: React.createElement(Component, { mode, state, key })
        } :
        {                           //else is a sortable toolbar button
          index: Component.index,
          condition: Component.condition,
          dom: React.createElement(Component.dom, { mode, state, key })
        };
    }));

    return (
      <aside style={{ ...ASIDE_STYLE, maxWidth: width, maxHeight: height }} className='toolbar'>
        {sorter.sort(sortButtonsCb).map(mapButtonsCb)}
      </aside>
    )
  }
}

Toolbar.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired,
  toolbarButtons: PropTypes.array
};

Toolbar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  appSetActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
