import React from 'react';
import PropTypes from 'prop-types';
import {FaFolderOpen as IconLoad} from 'react-icons/fa';
import ToolbarButton from './toolbar-button';
import {browserUpload}  from '../../utils/browser';

import LogoOpen from './assets/img/007.svg';
export default function ToolbarLoadButton({state}, {translator, projectActions}) {

  let loadProjectFromFile = event => {
    event.preventDefault();
    browserUpload().then((data) => {
      projectActions.loadProject(JSON.parse(data));
    });
  };

  return (
    <ToolbarButton active={false} tooltip={translator.t("Load project")} onClick={loadProjectFromFile}>
      <img src={LogoOpen} />
    </ToolbarButton>
  );
}

ToolbarLoadButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarLoadButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
