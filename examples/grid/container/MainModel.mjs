import Model  from '../../../src/data/Model.mjs';

/**
 * @class Neo.examples.grid.container.MainModel
 * @extends Neo.data.Model
 */
class MainModel extends Model {
    static getConfig() {return {
        className: 'Neo.examples.grid.container.MainModel',

        fields: [{
            name: 'country',
            type: 'string'
        }, {
            name: 'firstname',
            type: 'string'
        }, {
            name: 'githubId',
            type: 'string'
        }, {
            name: 'lastname',
            type: 'string'
        }]
    }}
}

Neo.applyClassConfig(MainModel);

export default MainModel;
