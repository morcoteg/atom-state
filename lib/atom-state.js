'use babel';

import AtomStateView from './atom-state-view';
import { CompositeDisposable } from 'atom';

export default {

  atomStateView: null,
  modalPanel: null,
  subscriptions: null,
  previousState: null,

  activate(state) {
    this.atomStateView = new AtomStateView(state.atomStateViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomStateView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-state:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomStateView.destroy();
  },

  serialize() {
    return {
      atomStateViewState: this.atomStateView.serialize()
    };
  },

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let reversed = selection.split('').reverse().join('')
      editor.insertText(reversed)
    }
  }

};
