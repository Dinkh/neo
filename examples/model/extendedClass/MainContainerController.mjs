import Component from '../../../src/controller/Component.mjs';

/**
 * @class ComponentModelExample.MainContainerController
 * @extends Neo.controller.Component
 */
class MainContainerController extends Component {
    static getConfig() {return {
        /**
         * @member {String} className='ComponentModelExample.MainContainerController'
         * @protected
         */
        className: 'ComponentModelExample.MainContainerController',
        /**
         * @member {String} ntype='main-container-controller'
         * @protected
         */
        ntype: 'main-container-controller'
    }}

    /**
     *
     * @param {Object} data
     */
    onButton1Click(data) {
        this.updateButton1Text('Button 1');
    }

    /**
     *
     * @param {Object} data
     */
    onButton2Click(data) {
        this.updateButton2Text('Button 2');
    }

    /**
     *
     * @param {Object} data
     */
    onTextField1Change(data) {
        this.updateButton1Text(data.value);
    }

    /**
     *
     * @param {Object} data
     */
    onTextField2Change(data) {
        this.updateButton2Text(data.value);
    }

    /**
     *
     * @param {String} value
     */
    updateButton1Text(value) {
        this.getModel().data['button1Text'] = value;
    }

    /**
     *
     * @param {String} value
     */
    updateButton2Text(value) {
        this.getModel().setData({
            button2Text: value
        });
    }
}

Neo.applyClassConfig(MainContainerController);

export {MainContainerController as default};
