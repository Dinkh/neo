import Base       from '../../core/Base.mjs';
import DomAccess  from '../DomAccess.mjs';
import Observable from '../../core/Observable.mjs';

/**
 * @class Neo.main.addon.GoogleMaps
 * @extends Neo.core.Base
 * @singleton
 */
class GoogleMaps extends Base {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.addon.GoogleMaps'
         * @protected
         */
        className: 'Neo.main.addon.GoogleMaps',
        /**
         * @member {Object} maps={}
         */
        maps: {},
        /**
         * @member {Object} markers={}
         */
        markers: {},
        /**
         * @member {Neo.core.Base[]} mixins=[Observable]
         */
        mixins: [Observable],
        /**
         * @member {Object} remote
         * @protected
         */
        remote: {
            app: [
                'addMarker',
                'create',
                'removeMap',
                'setCenter',
                'setZoom'
            ]
        },
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true
    }}

    /**
     * @param {Object} config
     */
    construct(config) {
        super.construct(config);
        this.loadApi();
    }

    /**
     * @param {Object} data
     * @param {String} data.id
     * @param {String} data.mapId
     * @param {Object} data.position
     * @param {String} [data.title]
     */
    addMarker(data) {
        let me = this;

        if (!me.maps[data.mapId]) {
            let listenerId = me.on('mapCreated', mapId => {
                if (data.mapId === mapId) {
                    me.un(listenerId);
                    me.addMarker(data);
                }
            })
        } else {
            Neo.ns(`${data.mapId}`, true, me.markers);

            me.markers[data.mapId][data.id] = new google.maps.Marker({
                position: data.position,
                map     : me.maps[data.mapId],
                title   : data.title,
            });
        }
    }

    /**
     * @param {Object} data
     * @param {Object} data.center
     * @param {String} data.id
     * @param {Number} data.maxZoom
     * @param {Number} data.minZoom
     * @param {Number} data.zoom
     * @param {Boolean} data.zoomControl
     */
    create(data) {
        let me = this;

        me.maps[data.id] = new google.maps.Map(DomAccess.getElement(data.id), {
            center     : data.center,
            maxZoom    : data.maxZoom,
            minZoom    : data.minZoom,
            zoom       : data.zoom,
            zoomControl: data.zoomControl
        });

        me.fire('mapCreated', data.id);
    }

    /**
     * @protected
     */
    loadApi() {
        DomAccess.loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCRj-EPE3H7PCzZtYCmDzln6sj7uPCGohA&v=weekly').then(() => {
            console.log('GoogleMaps API loaded');
        })
    }

    /**
     * @param {Object} data
     * @param {String} data.mapId
     */
    removeMap(data) {
        delete this.maps[data.mapId];
        delete this.markers[data.mapId];
    }

    /**
     * @param {Object} data
     * @param {String} data.id
     * @param {Object} data.value
     */
    setCenter(data) {
        this.maps[data.id].setCenter(data.value);
    }

    /**
     * @param {Object} data
     * @param {String} data.id
     * @param {Number} data.value
     */
    setZoom(data) {
        this.maps[data.id].setZoom(data.value);
    }
}

Neo.applyClassConfig(GoogleMaps);

let instance = Neo.create(GoogleMaps);

Neo.applyToGlobalNs(instance);

export default instance;
