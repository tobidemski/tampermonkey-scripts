// ==UserScript==
// @name         Azure - KeyVault: Add detail page link to secrets overview page
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Changes the secrets names in the overview page to a link to access the secret detailpage without leaving the actual page.
// @author       You
// @match        https://portal.azure.com/*
// @icon         https://azure.microsoft.com/svghandler/key-vault/?width=30&height=30
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
	
	let config = {
		'enableDebug': false
	}

    function log(message)
    {
		if(config.enableDebug === true)
		{
            console.debug('[KV-Ext]: ' + message);
		}
    }

    function initUrlWatcher()
    {
        var prevHref = window.location.href;

        window.setInterval(function () {
            if (window.location.href != prevHref) {
                prevHref = window.location.href;
                window.dispatchEvent(new Event(id + '_locationchange'));
            }
        }, 100);
    }

    const id = uuidv4();
    let observer = null;

    function getKeyVaultSecretOverviewPageMatch(url)
    {
        return url.match('https:\/\/portal.azure.com\/#(.+?)\/resource\/subscriptions\/(.+?)\/resourceGroups\/(.+?)\/providers\/Microsoft\.KeyVault\/vaults\/(.+?)\/secrets');
    }

    function isKeyVaultSecretOverviewPage(url)
    {
        return getKeyVaultSecretOverviewPageMatch(url) != null;
    }

    function uuidv4() {
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    function buildUrl(secretName)
    {
        // Should not be null!
        var match = getKeyVaultSecretOverviewPageMatch(window.location.href);
        let url = `https://portal.azure.com/#${match[1]}/asset/Microsoft_Azure_KeyVault/Secret/https://${match[4]}.vault.azure.net/secrets/${secretName}`;

        return url;
    }

    const tableObserverCallback = function(mutationList, observer)
    {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList') {
                if(mutation.target.tagName == 'TBODY')
                {
                    let addedNode = mutation.addedNodes[0];

                    if(addedNode.tagName == 'TR')
                    {
                        modifyTableRow(addedNode);
                    }
                }
            }
        }
    }

    function modifyTableRow(row)
    {
        let firstTdContentElement = row.querySelector('td .azc-grid-cellContent');
        let secretName = firstTdContentElement.textContent;

        firstTdContentElement.innerHTML = '';

        let link = document.createElement('a');
        link.setAttribute('href', buildUrl(secretName));
        link.setAttribute('target', '_blank');
        link.textContent = secretName;

        /* Prevent open detail page from row click and trigger normal link behavior */
        link.addEventListener('click', function(e){
            e.stopPropagation();
        });

        firstTdContentElement.append(link);
    }

    function checkState(url)
    {
        if(!isKeyVaultSecretOverviewPage(url)){

            if(observer != null)
            {
                log('Stopping observer.');
                observer.disconnect();
                observer = null;
            }

            return;
        }

        log(`Start runner for table search with id "${id}". Time: ${new Date().toLocaleString()}. Url: ${window.location.href}`);

        let runner = window.setInterval(function(){
            let tableElement = document.querySelector('.fxs-blade-content-container-details .azc-grid-tableContainer .azc-grid-tableContent');

            if(tableElement == null)
            {
                return;
            }

            window.clearInterval(runner);
            log('Table found. Stopping runner.');

            let rows = tableElement.querySelectorAll('tbody tr');

            if(rows.length > 0)
            {
                log(`Table has ${rows.length} rows.`);

                if(rows.length == 1 && rows[0].querySelectorAll('td').length == 1)
                {
                    // Only one row currently set with td node and text: "There are no secrets available."
                    log('There are no secrets available. td is currently placed.');
                }
                else
                {
                    for(let i = 0; i < rows.length; i++)
                    {
                        let row = rows[i];
                        modifyTableRow(row);
                    }
                }
            }
            else
            {
                log('Table is empty.');
            }

            log('Starting observer. ');
            observer = new MutationObserver(tableObserverCallback);
            observer.observe(tableElement, { attributes: false, childList: true, subtree: true });
        }, 100);
    }

    function init()
    {
        initUrlWatcher();

        window.addEventListener(id + '_locationchange', function () {
            log('Url changed: ' + window.location.href);
            checkState(window.location.href);
        });

        checkState(window.location.href);
    }

    init();

})();