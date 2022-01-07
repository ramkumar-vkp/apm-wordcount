'use babel';

import ApmWordcountView from './apm-wordcount-view';
import { CompositeDisposable } from 'atom';

export default {

  apmWordcountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.apmWordcountView = new ApmWordcountView(state.apmWordcountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.apmWordcountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'apm-wordcount:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.apmWordcountView.destroy();
  },

  serialize() {
    return {
      apmWordcountViewState: this.apmWordcountView.serialize()
    };
  },

  toggle() {
    console.log('ApmWordcount was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
