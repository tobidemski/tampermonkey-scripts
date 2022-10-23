// ==UserScript==
// @name         Azure - Subscriptions: Display current subscription
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds an defined tag if you navigate in a subscription to know which subscription is currently used.
// @author       You
// @match        https://portal.azure.com/*
// @icon         data:image/svg+xml;base64,PHN2ZyBpZD0iYmMxOGJhZGUtNTQ4MS00NDdlLWE5NTktNjU5ZDcyMzQ2NDc0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImE0NDVjNzE3LTlkNzUtNDRjNy1iYTZiLTBkOGYyMzgzZTU2MCIgY3g9Ii0zNi42MyIgY3k9IjE3LjEyIiByPSIxMS4xOCIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSg0MS44OCAtNy40KSBzY2FsZSgwLjk0IDAuOTQpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwLjI3IiBzdG9wLWNvbG9yPSIjZmZkNzBmIiAvPjxzdG9wIG9mZnNldD0iMC40OSIgc3RvcC1jb2xvcj0iI2ZmY2IxMiIgLz48c3RvcCBvZmZzZXQ9IjAuODgiIHN0b3AtY29sb3I9IiNmZWFjMTkiIC8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmVhMTFiIiAvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjx0aXRsZT5JY29uLWdlbmVyYWwtMjwvdGl0bGU+PHBhdGggaWQ9ImUzZDFlNThjLWY3OGUtNGZiNS05ODU3LTBjOTMzMWRhOTk3OSIgZD0iTTEzLjU2LDcuMTlhMi4wNywyLjA3LDAsMCwwLDAtMi45M2gwTDEwLC42OWEyLjA2LDIuMDYsMCwwLDAtMi45MiwwaDBMMy41Miw0LjI2YTIuMDksMi4wOSwwLDAsMCwwLDIuOTNsMywzYS42MS42MSwwLDAsMSwuMTcuNDF2NS41MmEuNy43LDAsMCwwLC4yLjVsMS4zNSwxLjM1YS40NS40NSwwLDAsMCwuNjYsMGwxLjMxLTEuMzFoMGwuNzctLjc3YS4yNi4yNiwwLDAsMCwwLS4zOGwtLjU1LS41NmEuMjkuMjksMCwwLDEsMC0uNDJsLjU1LS41NmEuMjYuMjYsMCwwLDAsMC0uMzhMMTAuNCwxM2EuMjguMjgsMCwwLDEsMC0uNDFMMTEsMTJhLjI2LjI2LDAsMCwwLDAtLjM4bC0uNzctLjc4di0uMjhabS01LTUuNjRBMS4xOCwxLjE4LDAsMSwxLDcuMzcsMi43MywxLjE3LDEuMTcsMCwwLDEsOC41NCwxLjU1WiIgZmlsbD0idXJsKCNhNDQ1YzcxNy05ZDc1LTQ0YzctYmE2Yi0wZDhmMjM4M2U1NjApIiAvPjxwYXRoIGlkPSJhMjFhOGY3YS02MWNjLTQwMzUtODQ0OS1lNWM4ZmU0ZDRkNWUiIGQ9Ik03LjYyLDE2LjIxaDBBLjI1LjI1LDAsMCwwLDgsMTZWMTEuNTVhLjI3LjI3LDAsMCwwLS4xMS0uMjJoMGEuMjUuMjUsMCwwLDAtLjM5LjIyVjE2QS4yNy4yNywwLDAsMCw3LjYyLDE2LjIxWiIgZmlsbD0iI2ZmOTMwMCIgb3BhY2l0eT0iMC43NSIgLz48cmVjdCBpZD0iZWNkMzE4OWMtZmIxZS00YTBlLWEyYjYtYmEyZjExZGRhNDg0IiB4PSI1LjY5IiB5PSI1LjQ1IiB3aWR0aD0iNS44NiIgaGVpZ2h0PSIwLjY5IiByeD0iMC4zMiIgZmlsbD0iI2ZmOTMwMCIgb3BhY2l0eT0iMC43NSIgLz48cmVjdCBpZD0iYTE5NDlhM2MtNDgxOC00YmQxLWIyMzYtMGQ5NzBiOTJmYzYyIiB4PSI1LjY5IiB5PSI2LjU3IiB3aWR0aD0iNS44NiIgaGVpZ2h0PSIwLjY5IiByeD0iMC4zMiIgZmlsbD0iI2ZmOTMwMCIgb3BhY2l0eT0iMC43NSIgLz48L3N2Zz4=
// @grant        GM_addStyle
// ==/UserScript==

/*
// @noframes
*/

(function() {
    'use strict';


    const config = {
        enableDebug: false,
        subscriptions: [
            {
                'subscription': '00000000-0000-0000-0000-000000000000', // Change empty guid to your subscription
                'name': 'MS:QA', // Define a name which should be added to the subscription in the overview page
                'headerName': 'My Subscription - QA System' // Define a name which should be displayed next to the azure header
            }
        ]
    };

    const subHeaderId = 'sub-ext-subscriptionName';
    GM_addStyle('#' + subHeaderId + '{ display: inline-block; font-size: 15px; padding: 0 20px; height: 40px; line-height: 40px; font-weight: bold; }');

    let observer = null;
    let bannerObserver = null;
    let allResourcesObserver = null;
    let currentSubscription = null;
    const id = uuidv4();

    function log(message)
    {
        if(config.enableDebug === true)
        {
            console.debug('[SUB-Ext]: ' + message);
        }
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

    function initUrlWatcher()
    {
        let prevHref = window.location.href;

        window.setInterval(function () {
            if (window.location.href != prevHref) {
                prevHref = window.location.href;
                window.dispatchEvent(new Event(id + '_locationchange'));
            }
        }, 100);
    }

    function getSubscriptionOverviewPageMatch(url)
    {
        return url.match('https://portal.azure.com/#view/Microsoft_Azure_Billing/SubscriptionsBlade');
    }

    function isSubscriptionOverviewPage(url)
    {
        return getSubscriptionOverviewPageMatch(url) != null;
    }

    function getAnySubscriptionPageMatch(url)
    {
        let pattern = '#(.+?)\/resource\/subscriptions\/([0-9a-fA-F]{8}[-]?(?:[0-9a-fA-F]{4}[-]?){3}[0-9a-fA-F]{12}).*';

        if(url.startsWith('https://'))
        {
            pattern ='https:\/\/portal.azure.com\/' + pattern;
        }

        return url.match(pattern);
    }

    function isAnySubscriptionPageMatch(url)
    {
        return getAnySubscriptionPageMatch(url) != null;
    }

    function getAllResourcesMatch(url)
    {
        return url.match('https://portal.azure.com/#view/HubsExtension/BrowseAll.*');
    }

    function isAllResourcesMatch(url)
    {
        return getAllResourcesMatch(url) != null;
    }

    function checkState(url)
    {
        checkAllResourcesPage(url);
        checkSubscriptionOverviewPage(url);
        checkAnySubscriptionPage(url);
    }

    const tableSubscriptionOverviewObserverCallback = function(mutationList, observer)
    {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList') {
                if(mutation.target.tagName == 'TBODY')
                {
                    let addedNode = mutation.addedNodes[0];

                    if(addedNode.tagName == 'DIV' && addedNode.classList.contains('fxc-gc-row'))
                    {
                        modifySubscriptionOverviewTableRow(addedNode);
                    }
                }
            }
        }
    }

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function removeSubscriptionHeader()
    {
        let subscriptionElement = document.querySelector('#' + subHeaderId);

        if(subscriptionElement != null)
        {
            subscriptionElement.remove();
        }
    }

    function addSubscriptionHeaderText(subscriptionName)
    {
        let azureHeaderTextElement = document.querySelector('#bannerlabel');

        let subscriptionElement = document.querySelector('#' + subHeaderId);
        let isNewElement = subscriptionElement == null;

        if(isNewElement)
        {
            subscriptionElement = document.createElement('div');
            subscriptionElement.id = subHeaderId;
            subscriptionElement.classList.add('fxs-topbar-brand');
            subscriptionElement.classList.add('fxs-topbar-search-activated-hidden');
            subscriptionElement.innerHTML = subscriptionName;

            /* Azure header not rendered yet */
            if(azureHeaderTextElement == null)
            {
                if(bannerObserver != null)
                {
                    log(id + ' - banner observer already started.');
                    return;
                }

                /* Add a watchter to check when the azure header is rendered */
                bannerObserver = new MutationObserver(function(mutationList, observer){
                    for (const mutation of mutationList) {
                        if (mutation.type === 'childList') {

                            let headerElement = Array.from(mutation.addedNodes).find(x => x.id == '_weave_e_0');

                            if(headerElement != null)
                            {
                                /* Stop observing */
                                bannerObserver.disconnect();
                                bannerObserver = null;

                                let bannerElement = headerElement.querySelector('#bannerlabel');
                                insertAfter(subscriptionElement, bannerElement);

                                break;
                            }
                        }
                    }
                });

                bannerObserver.observe(document, { attributes: false, childList: true, subtree: true });
            }
            else
            {
                insertAfter(subscriptionElement, azureHeaderTextElement);
            }
        }
        else
        {
            subscriptionElement.innerHTML = subscriptionName;
        }
    }

    function modifySubscriptionOverviewTableRow(row)
    {
        let cells = row.querySelectorAll('.fxc-gc-cell');
        let nameLinkElement = cells[0].querySelector('a');
        let name = nameLinkElement.textContent;

        let subscriptionelement = cells[1];
        let subscription = subscriptionelement.textContent.toLowerCase();

        let targetSubscription = config.subscriptions.find(o => o.subscription.toLowerCase() == subscription);

        if(targetSubscription != null && (targetSubscription.name != null && targetSubscription.name != ''))
        {
            nameLinkElement.innerHTML = '<b>' + targetSubscription.name + '</b> - ' + name;
        }
    }

    function checkAnySubscriptionPage(url)
    {
        let match = getAnySubscriptionPageMatch(url);

        if(match == null){
            currentSubscription = null;
            removeSubscriptionHeader();
            return;
        }

        let urlSubscription = match[2].toLowerCase();
        let targetSubscription = config.subscriptions.find(o => o.subscription.toLowerCase() == urlSubscription) || { 'subscription': '00000000-0000-0000-0000-000000000000', 'name': 'UNKNOWN' };

        if(targetSubscription == currentSubscription)
        {
            // Noting changed.
            return;
        }

        currentSubscription = targetSubscription;
        let name = '';
        let isUnknownSubscription = targetSubscription != null && targetSubscription.name == 'UNKNOWN';

        if(targetSubscription != null && targetSubscription.name != null && !isUnknownSubscription)
        {
            name = targetSubscription.headerName || '';

            if(name == '')
            {
                name = targetSubscription.name;
            }
        }

        if(isUnknownSubscription)
        {
            log(`Unknown subscription. Subscription id: "${urlSubscription}"`);
        }

        log(`Set header text with subscription name: "${name}"`);
        addSubscriptionHeaderText(name);
    }

    function checkSubscriptionOverviewPage(url)
    {
        if(!isSubscriptionOverviewPage(url)){

            if(observer != null)
            {
                log('Stopping table observer for overview page.');
                observer.disconnect();
                observer = null;
            }

            return;
        }

        log('Searching for the subscription table.');

        let runner = window.setInterval(function(){

            let tableElement = document.querySelector('.fxc-gc-table');

            if(tableElement == null)
            {
                return;
            }

            window.clearInterval(runner);
            log(id + ' - Table found. Stopping runner.');

            let rows = tableElement.querySelectorAll('.fxc-gc-tbody .fxc-gc-row');

            if(rows.length > 0)
            {
                log(`${id} - Table has ${rows.length} rows.`);

                for(let i = 0; i < rows.length; i++)
                {
                    let row = rows[i];

                    modifySubscriptionOverviewTableRow(row);
                }
            }
            else
            {
                log(id + ' - Table is empty.');
            }

            log(id + ' - Starting table observer for overview page. ');
            observer = new MutationObserver(tableSubscriptionOverviewObserverCallback);
            observer.observe(tableElement, { attributes: false, childList: true, subtree: true });
        }, 100);
    }

    function modifyAllResourcesTableRow(row)
    {
        let cells = row.querySelectorAll('.fxc-gc-cell');

        let nameCell = cells[4];
        let nameLinkElement = nameCell.querySelector('a');

        var setSubscriptionName = function(aElement)
        {
            let aTmScriptAttr = aElement.getAttribute('tm-script');
            let isExistingElement = aTmScriptAttr != null;

            if(isExistingElement)
            {
                return;
            }

            aElement.setAttribute('tm-script', true);

            let name = aElement.textContent;

            let href = aElement.getAttribute('href');
            let subscriptionMatch = getAnySubscriptionPageMatch(href);
            let subscription = subscriptionMatch[2].toLowerCase();

            let targetSubscription = config.subscriptions.find(o => o.subscription.toLowerCase() == subscription);

            if(targetSubscription != null && (targetSubscription.name != null && targetSubscription.name != ''))
            {
                aElement.innerHTML = '<b>' + targetSubscription.name + '</b> - ' + name;
            }
        }

        if(nameLinkElement != null)
        {
            log('link element found. Set modify the name.');
            // do magic
            setSubscriptionName(nameLinkElement);
        }
        else
        {
            var cellObserver = new MutationObserver(function(mutationList, observer)
                                                    {
                for (const mutation of mutationList) {
                    if (mutation.type === 'childList') {
                        for(let i = 0; i < mutation.addedNodes.length; i++)
                        {
                            let node = mutation.addedNodes[i];

                            if(node.tagName == 'A')
                            {
                                setSubscriptionName(node);
                            }
                        }
                    }
                }

                cellObserver.disconnect();
            });

            cellObserver.observe(nameCell, { attributes: false, childList: true, subtree: true });
        }
    }

    function checkAllResourcesPage(url)
    {
        if(!isAllResourcesMatch(url)){
            return;
        }

        console.log('All resource page detected.');

        log('Searching for the all resources table.');

        let runner = window.setInterval(function(){

            let tableElement = document.querySelector('.fxc-gc-table');

            if(tableElement == null)
            {
                return;
            }

            window.clearInterval(runner);
            log(id + ' - Table found. Stopping runner.');

            let rows = tableElement.querySelectorAll('.fxc-gc-tbody .fxc-gc-row');

            if(rows.length > 0)
            {
                log(`${id} - Table has ${rows.length} rows.`);

                for(let i = 0; i < rows.length; i++)
                {
                    let row = rows[i];

                    modifyAllResourcesTableRow(row);
                }
            }
            else
            {
                log(id + ' - Table is empty.');
            }

            log(id + ' - Starting table observer for all resources page. ');

            allResourcesObserver = new MutationObserver(function(mutationList, observer)
                                                        {
                for (const mutation of mutationList) {
                    if (mutation.type === 'childList') {
                        if(mutation.target.tagName == 'DIV' && mutation.target.classList.contains('fxc-gc-page') && mutation.addedNodes.length > 0)
                        {
                            log(`List updated. Checking ${mutation.addedNodes.length} nodes.`);

                            for(let i = 0; i < mutation.addedNodes.length; i++)
                            {
                                let node = mutation.addedNodes[i];

                                if(node.tagName == 'DIV' && node.classList.contains('fxc-gc-row'))
                                {
                                    modifyAllResourcesTableRow(node);
                                }
                            }
                        }
                    }
                }
            });

            allResourcesObserver.observe(tableElement, { attributes: false, childList: true, subtree: true });
        }, 100);
    }

    function init()
    {
        initUrlWatcher();

        window.addEventListener(id + '_locationchange', function () {
            log('url changed: ' + window.location.href);
            checkState(window.location.href);
        });

        checkState(window.location.href);
    }

    init();

})();