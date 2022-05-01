import ClassSystemUtil from '../util/ClassSystem.mjs';
import Toolbar         from './Base.mjs';

/**
 * @class Neo.toolbar.Paging
 * @extends Neo.toolbar.Base
 */
class Paging extends Toolbar {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.toolbar.Paging'
         * @protected
         */
        className: 'Neo.toolbar.Paging',
        /**
         * @member {String} ntype='paging-toolbar'
         * @protected
         */
        ntype: 'paging-toolbar',
        /**
         * @member {Number} currentPage_=1
         */
        currentPage_: 1,
        /**
         * @member {Number} pageSize_=30
         */
        pageSize_: 30,
        /**
         * @member {Function} pagesText=me=>`Page: ${me.page} / ${me.getMaxPages()}`
         */
        pagesText: me => `Page ${me.currentPage} / ${me.getMaxPages()}`,
        /**
         * @member {Neo.data.Store|null} store_=null
         */
        store_: null,
        /**
         * @member {Function} totalText=count=>`Total: ${count} records`
         */
        totalText: count => `Total: ${count} records`
    }}

    /**
     * @param config
     */
    construct(config) {
        super.construct(config);
        this.createToolbarItems();
    }

    /**
     * Triggered after the currentPage config got changed
     * @param {Number} value
     * @param {Number} oldValue
     * @protected
     */
    afterSetCurrentPage(value, oldValue) {
        if (oldValue) {
            this.store.currentPage = value;
        }
    }

    /**
     * Triggered before the store config gets changed.
     * @param {Neo.data.Store|Object|null} value
     * @param {Neo.data.Store|null} oldValue
     * @returns {Neo.data.Store}
     * @protected
     */
    beforeSetStore(value, oldValue) {
        let listeners = {
            load : this.onStoreLoad,
            scope: this
        };

        oldValue?.un(listeners);

        return ClassSystemUtil.beforeSetInstance(value, null, {listeners});
    }

    /**
     *
     */
    createToolbarItems() {
        let me = this;

        me.items = [{
            handler  : me.onFirstPageButtonClick.bind(me),
            iconCls  : 'fa fa-angles-left',
            reference: 'nav-button-first'
        }, {
            handler  : me.onPrevPageButtonClick.bind(me),
            iconCls  : 'fa fa-angle-left',
            reference: 'nav-button-prev',
            style    : {marginLeft: '2px'}
        }, {
            ntype    : 'label',
            reference: 'pages-text',
            style    : {marginLeft: '10px'},
            text     : me.pagesText(me)
        }, {
            handler  : me.onNextPageButtonClick.bind(me),
            iconCls  : 'fa fa-angle-right',
            reference: 'nav-button-next',
            style    : {marginLeft: '10px'}
        }, {
            handler  : me.onLastPageButtonClick.bind(me),
            iconCls  : 'fa fa-angles-right',
            reference: 'nav-button-last',
            style    : {marginLeft: '2px'}
        }, '->', {
            ntype    : 'label',
            reference: 'total-text',
            text     : me.totalText(me.store.totalCount)
        }];
    }

    /**
     * @returns {Number}
     */
    getMaxPages() {
        return Math.ceil(this.store.totalCount / this.pageSize);
    }

    /**
     *
     */
    onFirstPageButtonClick() {
        this.currentPage = 1;
    }

    /**
     *
     */
    onLastPageButtonClick() {
        this.currentPage = this.getMaxPages();
    }

    /**
     *
     */
    onNextPageButtonClick() {
        let me = this;

        if (me.currentPage < me.getMaxPages()) {
            me.currentPage++;
        }
    }

    /**
     *
     */
    onPrevPageButtonClick() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    /**
     *
     */
    onStoreLoad() {
        let me = this;

        me.updateNavigationButtons();
        me.updatePagesText();
        me.updateTotalText();
    }

    /**
     *
     */
    updateNavigationButtons() {
        let me          = this,
            currentPage = me.currentPage,
            maxPages    = me.getMaxPages();

        me.down({reference: 'nav-button-first'}).disabled = currentPage === 1;
        me.down({reference: 'nav-button-prev'}) .disabled = currentPage === 1;
        me.down({reference: 'nav-button-next'}) .disabled = currentPage === maxPages;
        me.down({reference: 'nav-button-last'}) .disabled = currentPage === maxPages;
    }

    /**
     *
     */
    updatePagesText() {
        let me = this;

        me.down({reference: 'pages-text'}).text = me.pagesText(me);
    }

    /**
     *
     */
    updateTotalText() {
        let me = this;

        me.down({reference: 'total-text'}).text = me.totalText(me.store.totalCount);
    }
}

Neo.applyClassConfig(Paging);

export default Paging;
