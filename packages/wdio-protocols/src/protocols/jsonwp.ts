const DEPRECATION_NOTICE = 'This command is deprecated and likely not supported by any browser.'
const TOUCH_DEPRECATION_NOTICE = `${DEPRECATION_NOTICE} Use the "action" command instead to execute a touch gesture!`
const GESTURE_DEPRECATION_NOTICE = `${DEPRECATION_NOTICE} Use the "action" command instead to execute a click gesture!`
const MOVETO_DEPRECATION_NOTICE = `${DEPRECATION_NOTICE} Use the "action" command instead to execute a "move to" gesture!`
const SETTIMEOUTS_DEPRECATION_NOTICE = `${DEPRECATION_NOTICE} Use the "setTimeouts" command instead!`
const SESSION_STORAGE_DEPRECATION_NOTICE = `${DEPRECATION_NOTICE} Use the "execute" command instead to interact with the session storage interface!`
const LOCAL_STORAGE_DEPRECATION_NOTICE = `${DEPRECATION_NOTICE} Use the "execute" command instead to interact with the session storage interface!`
const LOGS_DEPRECATION_NOTICE = `${DEPRECATION_NOTICE} Use the "devtools" instead to get logs!`
const POSITION_CLICK_DEPRECATION_NOTICE = `${DEPRECATION_NOTICE} Use the "action" command instead of "positionClick"!`
const ELEMENT_SIZE_DEPRECATION_NOTICE = `${DEPRECATION_NOTICE} Use the "getElementRect" command instead of "getElementSize"!`

/**
 * All commands are depreacted and likely not supported by any browser.
 * A deprecation notice is attached to all commands that only exist in the JSONWireProtocol.
 *
 * @deprecated
 */
export default {
    '/status': {
        GET: {
            command: 'status',
            description:
                "Query the server's current status. The server should respond with a general \"HTTP 200 OK\" response if it is alive and accepting commands. The response body should be a JSON object describing the state of the server. All server implementations should return two basic objects describing the server's current platform and when the server was built. All fields are optional; if omitted, the client should assume the value is unknown. Furthermore, server implementations may include additional fields not listed here.",
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#status',
            parameters: [],
            returns: {
                type: 'Object',
                name: 'status',
                description:
                    'An object describing the general status of the server.',
            },
        },
    },
    '/session': {
        POST: {
            command: 'newSession',
            description:
                'Create a new session. The server should attempt to create a session that most closely matches the desired and required capabilities. Required capabilities have higher priority than desired capabilities and must be set for the session to be created.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#session-1',
            parameters: [
                {
                    name: 'desiredCapabilities',
                    type: 'object',
                    description:
                        "An object describing the session's desired capabilities.",
                    required: true,
                },
                {
                    name: 'requiredCapabilities',
                    type: 'object',
                    description:
                        "An object describing the session's required capabilities (Optional).",
                },
            ],
            returns: {
                type: 'Object',
                name: 'capabilities',
                description: "An object describing the session's capabilities.",
            },
        },
    },
    '/sessions': {
        GET: {
            command: 'getSessions',
            deprecated: DEPRECATION_NOTICE,
            description:
                'Returns a list of the currently active sessions. Each session will be returned as a list of JSON objects containing `id` and `capabilities`.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessions',
            parameters: [],
            returns: {
                type: 'Object[]',
                name: 'capabilities',
                description: 'A list of the currently active sessions.',
            },
        },
    },
    '/session/:sessionId': {
        GET: {
            command: 'getSession',
            deprecated: DEPRECATION_NOTICE,
            description: 'Retrieve the capabilities of the specified session.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#get-sessionsessionid',
            parameters: [],
            returns: {
                type: 'Object',
                name: 'capabilities',
                description: "An object describing the session's capabilities.",
            },
        },
        DELETE: {
            command: 'deleteSession',
            description: 'Delete the session.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#delete-sessionsessionid',
            parameters: [{
                name: 'deleteSessionOpts',
                type: 'object',
                description:
                    'Object containing options for the deleteSession command, e.g. `{ shutdownDriver: boolean }`',
                required: false,
            }],
        },
    },
    '/session/:sessionId/timeouts': {
        POST: {
            command: 'setTimeouts',
            description:
                'Configure the amount of time that a particular type of operation can execute for before they are aborted and a |Timeout| error is returned to the client.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtimeouts',
            parameters: [
                {
                    name: 'type',
                    type: 'string',
                    description:
                        'The type of operation to set the timeout for. Valid values are: "script" for script timeouts, "implicit" for modifying the implicit wait timeout and "page load" for setting a page load timeout.',
                    required: true,
                },
                {
                    name: 'ms',
                    type: 'number',
                    description:
                        'The amount of time, in milliseconds, that time-limited commands are permitted to run',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/timeouts/async_script': {
        POST: {
            command: 'setAsyncTimeout',
            deprecated: SETTIMEOUTS_DEPRECATION_NOTICE,
            description:
                'Set the amount of time, in milliseconds, that asynchronous scripts executed by `/session/:sessionId/execute_async` are permitted to run before they are aborted and a `Timeout` error is returned to the client.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtimeoutsasync_script',
            parameters: [
                {
                    name: 'ms',
                    type: 'number',
                    description:
                        'The amount of time, in milliseconds, that time-limited commands are permitted to run',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/timeouts/implicit_wait': {
        POST: {
            command: 'setImplicitTimeout',
            deprecated: SETTIMEOUTS_DEPRECATION_NOTICE,
            description:
                'Set the amount of time the driver should wait when searching for elements. When searching for a single element, the driver should poll the page until an element is found or the timeout expires, whichever occurs first. When searching for multiple elements, the driver should poll the page until at least one element is found or the timeout expires, at which point it should return an empty list. If this command is never sent, the driver should default to an implicit wait of 0ms.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtimeoutsimplicit_wait',
            parameters: [
                {
                    name: 'ms',
                    type: 'number',
                    description:
                        'The amount of time, in milliseconds, to wait on an element.',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/url': {
        GET: {
            command: 'getUrl',
            description: 'Retrieve the URL of the current page.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#get-sessionsessionidurl',
            parameters: [],
            returns: {
                type: 'String',
                name: 'url',
                description: 'The current URL.',
            },
        },
        POST: {
            command: 'navigateTo',
            description: 'Navigate to a new URL.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#post-sessionsessionidurl',
            parameters: [
                {
                    name: 'url',
                    type: 'string',
                    description: 'The URL to navigate to.',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/back': {
        POST: {
            command: 'back',
            description:
                'Navigate backwards in the browser history, if possible.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidback',
            parameters: [],
        },
    },
    '/session/:sessionId/forward': {
        POST: {
            command: 'forward',
            description:
                'Navigate forwards in the browser history, if possible.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidforward',
            parameters: [],
        },
    },
    '/session/:sessionId/refresh': {
        POST: {
            command: 'refresh',
            description: 'Refresh the current page.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidrefresh',
            parameters: [],
        },
    },
    '/session/:sessionId/title': {
        GET: {
            command: 'getTitle',
            description: 'Get the current page title.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtitle',
            parameters: [],
            returns: {
                type: 'String',
                name: 'title',
                description: 'The current page title.',
            },
        },
    },
    '/session/:sessionId/window_handle': {
        GET: {
            command: 'getWindowHandle',
            description: 'Retrieve the current window handle.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindow_handle',
            parameters: [],
            returns: {
                type: 'String',
                name: 'windowHandle',
                description: 'The current window handle.',
            },
        },
    },
    '/session/:sessionId/window_handles': {
        GET: {
            command: 'getWindowHandles',
            description:
                'Retrieve the list of all window handles available to the session.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindow_handles',
            parameters: [],
            returns: {
                type: 'String[]',
                name: 'windowHandles',
                description: 'A list of window handles.',
            },
        },
    },
    '/session/:sessionId/window': {
        DELETE: {
            command: 'closeWindow',
            description: 'Close the current window.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#delete-sessionsessionidwindow',
            parameters: [],
        },
        POST: {
            command: 'switchToWindow',
            description:
                'Change focus to another window. The window to change focus to may be specified by its server assigned window handle, or by the value of its `name` attribute.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#post-sessionsessionidwindow',
            parameters: [
                {
                    name: 'name',
                    type: 'string',
                    description: 'The window to change focus to',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/frame': {
        POST: {
            command: 'switchToFrame',
            description:
                "Change focus to another frame on the page. If the frame `id` is `null`, the server should switch to the page's default content.",
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidframe',
            parameters: [
                {
                    name: 'id',
                    type: '(string|number|object|null)',
                    description: 'Identifier for the frame to change focus to',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/frame/parent': {
        POST: {
            command: 'switchToParentFrame',
            description:
                'Change focus to the parent context. If the current context is the top level browsing context, the context remains unchanged.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidframeparent',
            parameters: [],
        },
    },
    '/session/:sessionId/window/current/position': {
        GET: {
            command: 'getWindowPosition',
            deprecated: DEPRECATION_NOTICE,
            description: 'Get the position of the current focussed window.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#get-sessionsessionidwindowwindowhandleposition',
            parameters: [],
            returns: {
                type: 'Object',
                name: 'positon',
                description:
                    'The X and Y coordinates for the window, relative to the upper left corner of the screen.',
            },
        },
        POST: {
            command: 'setWindowPosition',
            deprecated: DEPRECATION_NOTICE,
            description: 'Change the position of the current focussed window.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#post-sessionsessionidwindowwindowhandleposition',
            parameters: [
                {
                    name: 'x',
                    type: 'number',
                    description:
                        'The X coordinate to position the window at, relative to the upper left corner of the screen.',
                    required: true,
                },
                {
                    name: 'y',
                    type: 'number',
                    description:
                        'The Y coordinate to position the window at, relative to the upper left corner of the screen.',
                    required: true,
                },
            ],
            returns: {
                type: 'Object',
                name: 'positon',
                description:
                    'The X and Y coordinates for the window, relative to the upper left corner of the screen.',
            },
        },
    },
    '/session/:sessionId/window/current/size': {
        GET: {
            command: '_getWindowSize',
            deprecated: DEPRECATION_NOTICE,
            description: 'Get the size of the current focused window.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#get-sessionsessionidwindowwindowhandlesize',
            parameters: [],
            returns: {
                type: 'Object',
                name: 'size',
                description: 'The size of the window.',
            },
        },
        POST: {
            command: '_setWindowSize',
            deprecated: DEPRECATION_NOTICE,
            description: 'Change the size of the current focused window.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#post-sessionsessionidwindowwindowhandlesize',
            parameters: [
                {
                    name: 'width',
                    type: 'number',
                    description: 'the new window width',
                    required: true,
                },
                {
                    name: 'height',
                    type: 'number',
                    description: 'the new window height',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/window/current/maximize': {
        POST: {
            command: 'maximizeWindow',
            description:
                'Maximize the current focused window if not already maximized.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindowwindowhandlemaximize',
            parameters: [],
        },
    },
    '/session/:sessionId/element': {
        POST: {
            command: 'findElement',
            description:
                'Search for an element on the page, starting from the document root. The located element will be returned as a WebElement JSON object. The table below lists the locator strategies that each server should support. Each locator must return the first matching element located in the DOM.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelement',
            parameters: [
                {
                    name: 'using',
                    type: 'string',
                    description: 'the locator strategy to use',
                    required: true,
                },
                {
                    name: 'value',
                    type: 'string',
                    description: 'the search target',
                    required: true,
                },
            ],
            returns: {
                type: 'object',
                name: 'ELEMENT',
                description:
                    'A WebElement JSON object for the located element.',
            },
        },
    },
    '/session/:sessionId/elements': {
        POST: {
            command: 'findElements',
            description:
                'Search for multiple elements on the page, starting from the document root. The located elements will be returned as a WebElement JSON objects. The table below lists the locator strategies that each server should support. Elements should be returned in the order located in the DOM.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelements',
            parameters: [
                {
                    name: 'using',
                    type: 'string',
                    description: 'the locator strategy to use',
                    required: true,
                },
                {
                    name: 'value',
                    type: 'string',
                    description: 'the search target',
                    required: true,
                },
            ],
            returns: {
                type: 'object[]',
                name: 'ELEMENTS',
                description:
                    'A list of WebElement JSON objects for the located elements.',
            },
        },
    },
    '/session/:sessionId/element/:elementId/element': {
        POST: {
            command: 'findElementFromElement',
            description:
                'Search for an element on the page, starting from the identified element. The located element will be returned as a WebElement JSON object. The table below lists the locator strategies that each server should support. Each locator must return the first matching element located in the DOM.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidelement',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
            ],
            parameters: [
                {
                    name: 'using',
                    type: 'string',
                    description: 'the locator strategy to use',
                    required: true,
                },
                {
                    name: 'value',
                    type: 'string',
                    description: 'the search target',
                    required: true,
                },
            ],
            returns: {
                type: 'object',
                name: 'ELEMENT',
                description:
                    'A WebElement JSON object for the located element.',
            },
        },
    },
    '/session/:sessionId/element/:elementId/elements': {
        POST: {
            command: 'findElementsFromElement',
            description:
                'Search for multiple elements on the page, starting from the identified element. The located elements will be returned as a WebElement JSON objects. The table below lists the locator strategies that each server should support. Elements should be returned in the order located in the DOM.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidelements',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
            ],
            parameters: [
                {
                    name: 'using',
                    type: 'string',
                    description: 'the locator strategy to use',
                    required: true,
                },
                {
                    name: 'value',
                    type: 'string',
                    description: 'the search target',
                    required: true,
                },
            ],
            returns: {
                type: 'object[]',
                name: 'ELEMENTS',
                description:
                    'A list of WebElement JSON objects for the located elements.',
            },
        },
    },
    '/session/:sessionId/element/active': {
        POST: {
            command: 'getActiveElement',
            description:
                'Get the element on the page that currently has focus. The element will be returned as a WebElement JSON object.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementactive',
            parameters: [],
            returns: {
                type: 'String',
                name: 'ELEMENT',
                description: 'A WebElement JSON object for the active element.',
            },
        },
    },
    '/session/:sessionId/element/:elementId/selected': {
        GET: {
            command: 'isElementSelected',
            description:
                'Determine if an `OPTION` element, or an `INPUT` element of type `checkbox` or `radiobutton` is currently selected.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidselected',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
            ],
            parameters: [],
            returns: {
                type: 'Boolean',
                name: 'isSelected',
                description: 'Whether the element is selected.',
            },
        },
    },
    '/session/:sessionId/element/:elementId/displayed': {
        GET: {
            command: 'isElementDisplayed',
            description: 'Determine if an element is currently displayed.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementiddisplayed',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
            ],
            parameters: [],
            returns: {
                type: 'Boolean',
                name: 'isDisplayed',
                description: 'Whether the element is displayed.',
            },
        },
    },
    '/session/:sessionId/element/:elementId/attribute/:name': {
        GET: {
            command: 'getElementAttribute',
            description: "Get the value of an element's attribute.",
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidattributename',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
                {
                    name: 'name',
                    description: 'name of the attribute value to retrieve',
                },
            ],
            parameters: [],
            returns: {
                type: 'String|Null',
                name: 'attribute',
                description:
                    'The value of the attribute, or null if it is not set on the element.',
            },
        },
    },
    '/session/:sessionId/element/:elementId/css/:propertyName': {
        GET: {
            command: 'getElementCSSValue',
            description:
                "Query the value of an element's computed CSS property. The CSS property to query should be specified using the CSS property name, __not__ the JavaScript property name (e.g. `background-color` instead of `backgroundColor`).",
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidcsspropertyname',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
                {
                    name: 'propertyName',
                    description: 'name of the CSS property to retrieve',
                },
            ],
            parameters: [],
            returns: {
                type: 'String',
                name: 'propertyName',
                description: 'The value of the specified CSS property.',
            },
        },
    },
    '/session/:sessionId/element/:elementId/text': {
        GET: {
            command: 'getElementText',
            description: 'Returns the visible text for the element.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidtext',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
            ],
            parameters: [],
            returns: {
                type: 'String',
                name: 'text',
                description: 'The visible text of the element.',
            },
        },
    },
    '/session/:sessionId/element/:elementId/name': {
        GET: {
            command: 'getElementTagName',
            description: "Query for an element's tag name.",
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidname',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
            ],
            parameters: [],
            returns: {
                type: 'String',
                name: 'tagName',
                description: "The element's tag name, as a lowercase string.",
            },
        },
    },
    '/session/:sessionId/element/:elementId/location': {
        GET: {
            command: 'getElementLocation',
            deprecated: DEPRECATION_NOTICE,
            description:
                "Determine an element's location on the page. The point `(0, 0)` refers to the upper-left corner of the page. The element's coordinates are returned as a JSON object with `x` and `y` properties.",
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidlocation',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
            ],
            parameters: [],
            returns: {
                type: 'Object',
                name: 'location',
                description:
                    'The X and Y coordinates for the element on the page.',
            },
        },
    },
    '/session/:sessionId/element/:elementId/location_in_view': {
        GET: {
            command: 'getElementLocationInView',
            deprecated: DEPRECATION_NOTICE,
            description:
                "Determine an element's location on the screen once it has been scrolled into view.<br /><br />__Note:__ This is considered an internal command and should only be used to determine an element's location for correctly generating native events.",
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidlocation_in_view',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
            ],
            parameters: [],
            returns: {
                type: 'Object',
                name: 'location',
                description:
                    'The X and Y coordinates for the element on the page.',
            },
        },
    },
    '/session/:sessionId/element/:elementId/size': {
        GET: {
            command: 'getElementSize',
            description:
                "Determine an element's size in pixels. The size will be returned as a JSON object with `width` and `height` properties.",
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidsize',
            deprecated: ELEMENT_SIZE_DEPRECATION_NOTICE,
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
            ],
            parameters: [],
            returns: {
                type: 'Object',
                name: 'size',
                description: 'The width and height of the element, in pixels.',
            },
        },
    },
    '/session/:sessionId/element/:elementId/enabled': {
        GET: {
            command: 'isElementEnabled',
            description: 'Determine if an element is currently enabled.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidenabled',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
            ],
            parameters: [],
            returns: {
                type: 'Boolean',
                name: 'isEnabled',
                description: 'Whether the element is enabled.',
            },
        },
    },
    '/session/:sessionId/element/:elementId/click': {
        POST: {
            command: 'elementClick',
            description:
                'Click any mouse button (at the coordinates set by the last moveto command). Note that calling this command after calling buttondown and before calling button up (or any out-of-order interactions sequence) will yield undefined behaviour).',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidclick',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
            ],
            parameters: [],
        },
    },
    '/session/:sessionId/element/:elementId/equals/:otherId': {
        GET: {
            command: 'elementEquals',
            description: 'Compare elements with each other.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidequalsother',
            deprecated: DEPRECATION_NOTICE,
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
                {
                    name: 'otherElementId',
                    description: 'ID of the element to compare against',
                },
            ],
            parameters: [],
            returns: {
                type: 'Boolean',
                name: 'isEqual',
                description: 'Whether the two IDs refer to the same element.',
            },
        },
    },
    '/session/:sessionId/element/:elementId/submit': {
        POST: {
            command: 'elementSubmit',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidsubmit',
            deprecated: DEPRECATION_NOTICE,
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the form element to be submitted',
                },
            ],
            parameters: [],
        },
    },
    '/session/:sessionId/element/:elementId/clear': {
        POST: {
            command: 'elementClear',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidclear',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
            ],
            parameters: [],
        },
    },
    '/session/:sessionId/element/:elementId/value': {
        POST: {
            command: 'elementSendKeys',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidvalue',
            variables: [
                {
                    name: 'elementId',
                    description: 'ID of the element to route the command to',
                },
            ],
            parameters: [
                {
                    name: 'value',
                    type: 'string[]',
                    description:
                        'The sequence of keys to type. An array must be provided.',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/keys': {
        POST: {
            command: 'sendKeys',
            deprecated: DEPRECATION_NOTICE,
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidkeys',
            parameters: [
                {
                    name: 'value',
                    type: 'string[]',
                    description:
                        'The sequence of keys to type. An array must be provided.',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/source': {
        GET: {
            command: 'getPageSource',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidsource',
            parameters: [],
            returns: {
                type: 'String',
                name: 'source',
                description: 'The current page source.',
            },
        },
    },
    '/session/:sessionId/execute': {
        POST: {
            command: 'executeScript',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidexecute',
            parameters: [
                {
                    name: 'script',
                    type: 'string',
                    description: 'the script to execute',
                    required: true,
                },
                {
                    name: 'args',
                    type: '(string|object|number|boolean|undefined)[]',
                    description: 'the script arguments',
                    required: false,
                },
            ],
            returns: {
                type: '*',
                name: 'result',
                description: 'The script result.',
            },
        },
    },
    '/session/:sessionId/execute_async': {
        POST: {
            command: 'executeAsyncScript',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidexecute_async',
            parameters: [
                {
                    name: 'script',
                    type: 'string',
                    description: 'the script to execute',
                    required: true,
                },
                {
                    name: 'args',
                    type: '(string|object|number|boolean|undefined)[]',
                    description: 'the script arguments',
                    required: true,
                },
            ],
            returns: {
                type: '*',
                name: 'result',
                description: 'The script result.',
            },
        },
    },
    '/session/:sessionId/cookie': {
        GET: {
            command: 'getAllCookies',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#get-sessionsessionidcookie',
            parameters: [],
            returns: {
                type: 'Object[]',
                name: 'cookies',
                description: 'A list of cookies.',
            },
        },
        POST: {
            command: 'addCookie',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#post-sessionsessionidcookie',
            parameters: [
                {
                    name: 'cookie',
                    type: 'object',
                    description:
                        'A JSON object representing a cookie. It must have at least the name and value fields and could have more, including expiry-time and so on',
                    required: true,
                },
            ],
        },
        DELETE: {
            command: 'deleteAllCookies',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#delete-sessionsessionidcookie',
            parameters: [],
        },
    },
    '/session/:sessionId/cookie/:name': {
        DELETE: {
            command: 'deleteCookie',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#delete-sessionsessionidcookiename',
            variables: [
                {
                    name: 'name',
                    description: 'name of the cookie to retrieve',
                },
            ],
            parameters: [],
        },
    },
    '/session/:sessionId/dismiss_alert': {
        POST: {
            command: 'dismissAlert',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessioniddismiss_alert',
            parameters: [],
        },
    },
    '/session/:sessionId/accept_alert': {
        POST: {
            command: 'acceptAlert',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidaccept_alert',
            parameters: [],
        },
    },
    '/session/:sessionId/alert_text': {
        GET: {
            command: 'getAlertText',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#get-sessionsessionidalert_text',
            parameters: [],
            returns: {
                type: 'String',
                name: 'alertText',
                description: 'The text of the currently displayed alert.',
            },
        },
        POST: {
            command: 'sendAlertText',
            description: '',
            ref: 'https://w3c.github.io/webdriver/webdriver-spec.html#dfn-send-alert-text',
            parameters: [
                {
                    name: 'text',
                    type: 'string',
                    description: 'keystrokes to send to the prompt() dialog',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/screenshot': {
        GET: {
            command: 'takeScreenshot',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidscreenshot',
            parameters: [],
            returns: {
                type: 'String',
                name: 'screenshot',
                description: 'screenshot as a base64 encoded PNG',
            },
        },
    },
    '/session/:sessionId/ime/available_engines': {
        GET: {
            command: 'getAvailableEngines',
            description: '',
            deprecated: DEPRECATION_NOTICE,
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimeavailable_engines',
            parameters: [],
            returns: {
                type: 'String[]',
                name: 'engines',
                description: 'A list of available engines',
            },
        },
    },
    '/session/:sessionId/ime/active_engine': {
        GET: {
            command: 'getActiveEngine',
            description: '',
            deprecated: DEPRECATION_NOTICE,
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimeactive_engine',
            parameters: [],
            returns: {
                type: 'String',
                name: 'engine',
                description: 'The name of the active IME engine',
            },
        },
    },
    '/session/:sessionId/ime/activated': {
        GET: {
            command: 'isIMEActivated',
            deprecated: DEPRECATION_NOTICE,
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimeactivated',
            parameters: [],
            returns: {
                type: 'Boolean',
                name: 'isActive',
                description:
                    'true if IME input is available and currently active, false otherwise',
            },
        },
    },
    '/session/:sessionId/ime/deactivate': {
        POST: {
            command: 'deactivateIME',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimedeactivate',
            deprecated: DEPRECATION_NOTICE,
            parameters: [],
        },
    },
    '/session/:sessionId/ime/activate': {
        POST: {
            command: 'activateIME',
            description: '',
            deprecated: DEPRECATION_NOTICE,
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimeactivate',
            parameters: [
                {
                    name: 'engine',
                    type: 'string',
                    description: 'name of the engine to activate',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/orientation': {
        GET: {
            command: 'getOrientation',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#get-sessionsessionidorientation',
            parameters: [],
            deprecated: DEPRECATION_NOTICE,
            returns: {
                type: 'String',
                name: 'orientation',
                description:
                    'The current browser orientation corresponding to a value defined in ScreenOrientation: `LANDSCAPE|PORTRAIT`.',
            },
        },
        POST: {
            command: 'setOrientation',
            description: '',
            deprecated: DEPRECATION_NOTICE,
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#post-sessionsessionidorientation',
            parameters: [
                {
                    name: 'orientation',
                    type: 'string',
                    description:
                        'the new browser orientation as defined in ScreenOrientation: `LANDSCAPE|PORTRAIT`',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/moveto': {
        POST: {
            command: 'moveToElement',
            description: '',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidmoveto',
            deprecated: MOVETO_DEPRECATION_NOTICE,
            parameters: [
                {
                    name: 'element',
                    type: '(string|null)',
                    description:
                        'opaque ID assigned to the element to move to, as described in the WebElement JSON Object, if not specified or is null, the offset is relative to current position of the mouse',
                    required: false,
                },
                {
                    name: 'xoffset',
                    type: 'number',
                    description:
                        'x offset to move to, relative to the top-left corner of the element, if not specified, the mouse will move to the middle of the element',
                    required: false,
                },
                {
                    name: 'yoffset',
                    type: 'number',
                    description:
                        'y offset to move to, relative to the top-left corner of the element, if not specified, the mouse will move to the middle of the element',
                    required: false,
                },
            ],
        },
    },
    '/session/:sessionId/buttondown': {
        POST: {
            command: 'buttonDown',
            description:
                'Click and hold the left mouse button (at the coordinates set by the last moveto command). Note that the next mouse-related command that should follow is buttonup . Any other mouse command (such as click or another call to buttondown) will yield undefined behaviour.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidbuttondown',
            deprecated: GESTURE_DEPRECATION_NOTICE,
            parameters: [
                {
                    name: 'button',
                    type: 'number',
                    description:
                        'which button, enum: LEFT = 0, MIDDLE = 1 , RIGHT = 2, defaults to the left mouse button if not specified',
                    required: false,
                },
            ],
        },
    },
    '/session/:sessionId/buttonup': {
        POST: {
            command: 'buttonUp',
            description:
                'Releases the mouse button previously held (where the mouse is currently at). Must be called once for every buttondown command issued. See the note in click and buttondown about implications of out-of-order commands.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidbuttonup',
            deprecated: GESTURE_DEPRECATION_NOTICE,
            parameters: [
                {
                    name: 'button',
                    type: 'number',
                    description:
                        'which button, enum: LEFT = 0, MIDDLE = 1 , RIGHT = 2, defaults to the left mouse button if not specified',
                    required: false,
                },
            ],
        },
    },
    '/session/:sessionId/click': {
        POST: {
            command: 'positionClick',
            description:
                'Clicks at the current mouse coordinates (set by moveto).',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidclick',
            deprecated: POSITION_CLICK_DEPRECATION_NOTICE,
            parameters: [
                {
                    name: 'button',
                    type: 'number',
                    description:
                        'which button, enum: LEFT = 0, RIGHT = 2, defaults to the left mouse button if not specified',
                    required: false,
                },
            ],
        },
    },
    '/session/:sessionId/doubleclick': {
        POST: {
            command: 'positionDoubleClick',
            deprecated: GESTURE_DEPRECATION_NOTICE,
            description:
                'Double-clicks at the current mouse coordinates (set by moveto).',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessioniddoubleclick',
            parameters: [],
        },
    },
    '/session/:sessionId/touch/click': {
        POST: {
            command: 'touchClick',
            description: 'Single tap on the touch enabled device.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchclick',
            deprecated: TOUCH_DEPRECATION_NOTICE,
            parameters: [
                {
                    name: 'element',
                    type: 'string',
                    description: 'ID of the element to single tap on.',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/touch/down': {
        POST: {
            command: 'touchDown',
            description: 'Finger down on the screen.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchdown',
            deprecated: TOUCH_DEPRECATION_NOTICE,
            parameters: [
                {
                    name: 'x',
                    type: 'number',
                    description: 'x coordinate on the screen',
                    required: true,
                },
                {
                    name: 'y',
                    type: 'number',
                    description: 'y coordinate on the screen',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/touch/up': {
        POST: {
            command: 'touchUp',
            description: 'Finger up on the screen.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchup',
            deprecated: TOUCH_DEPRECATION_NOTICE,
            parameters: [
                {
                    name: 'x',
                    type: 'number',
                    description: 'x coordinate on the screen',
                    required: true,
                },
                {
                    name: 'y',
                    type: 'number',
                    description: 'y coordinate on the screen',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/touch/move': {
        POST: {
            command: 'touchMove',
            description: 'Finger move on the screen.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchmove',
            deprecated: TOUCH_DEPRECATION_NOTICE,
            parameters: [
                {
                    name: 'x',
                    type: 'number',
                    description: 'x coordinate on the screen',
                    required: true,
                },
                {
                    name: 'y',
                    type: 'number',
                    description: 'y coordinate on the screen',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/touch/scroll': {
        POST: {
            command: 'touchScroll',
            description: 'Finger move on the screen.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchscroll',
            deprecated: TOUCH_DEPRECATION_NOTICE,
            parameters: [
                {
                    name: 'xoffset',
                    type: 'number',
                    description: 'the x offset in pixels to scroll by',
                    required: true,
                },
                {
                    name: 'yoffset',
                    type: 'number',
                    description: 'the y offset in pixels to scroll by',
                    required: true,
                },
                {
                    name: 'element',
                    type: 'string',
                    description: 'ID of the element where the scroll starts',
                    required: false,
                },
            ],
        },
    },
    '/session/:sessionId/touch/doubleclick': {
        POST: {
            command: 'touchDoubleClick',
            description:
                'Double tap on the touch screen using finger motion events.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchdoubleclick',
            deprecated: TOUCH_DEPRECATION_NOTICE,
            parameters: [
                {
                    name: 'element',
                    type: 'string',
                    description: 'ID of the element to double tap on',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/touch/longclick': {
        POST: {
            command: 'touchLongClick',
            description:
                'Long press on the touch screen using finger motion events.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchlongclick',
            deprecated: TOUCH_DEPRECATION_NOTICE,
            parameters: [
                {
                    name: 'element',
                    type: 'string',
                    description: 'ID of the element to long press on',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/touch/flick': {
        POST: {
            command: 'touchFlick',
            description:
                'Flick on the touch screen using finger motion events. This flickcommand starts at a particulat screen location.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchflick',
            deprecated: TOUCH_DEPRECATION_NOTICE,
            parameters: [
                {
                    name: 'xoffset',
                    type: 'number',
                    description: 'the x offset in pixels to flick by',
                    required: false,
                },
                {
                    name: 'yoffset',
                    type: 'number',
                    description: 'the y offset in pixels to flick by',
                    required: false,
                },
                {
                    name: 'element',
                    type: 'string',
                    description: 'ID of the element where the flick starts',
                    required: false,
                },
                {
                    name: 'speed',
                    type: 'number',
                    description: 'the speed in pixels per seconds',
                    required: false,
                },
                {
                    name: 'xspeed',
                    type: 'number',
                    description: 'the x speed in pixels per second',
                    required: false,
                },
                {
                    name: 'yspeed',
                    type: 'number',
                    description: 'the y speed in pixels per second',
                    required: false,
                },
            ],
        },
    },
    '/session/:sessionId/location': {
        GET: {
            command: 'getGeoLocation',
            description: 'Get the current geo location.',
            deprecated: DEPRECATION_NOTICE,
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#get-sessionsessionidlocation',
            parameters: [],
            returns: {
                type: 'Object',
                name: 'location',
                description: 'The current geo location.',
            },
        },
        POST: {
            command: 'setGeoLocation',
            description: 'Set the current geo location.',
            deprecated: DEPRECATION_NOTICE,
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#post-sessionsessionidlocation',
            parameters: [
                {
                    name: 'location',
                    type: 'object',
                    description:
                        'the new location (`{latitude: number, longitude: number, altitude: number}`)',
                    required: true,
                },
            ],
        },
    },
    '/session/:sessionId/local_storage': {
        GET: {
            command: 'getLocalStorage',
            description: 'Get all keys of the storage.',
            deprecated: LOCAL_STORAGE_DEPRECATION_NOTICE,
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#get-sessionsessionidlocal_storage',
            parameters: [],
            returns: {
                type: 'String[]',
                name: 'keys',
                description: 'The list of keys.',
            },
        },
        POST: {
            command: 'setLocalStorage',
            description: 'Set the storage item for the given key.',
            deprecated: LOCAL_STORAGE_DEPRECATION_NOTICE,
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#post-sessionsessionidlocal_storage',
            parameters: [
                {
                    name: 'key',
                    type: 'string',
                    description: 'the key to set',
                    required: true,
                },
                {
                    name: 'value',
                    type: 'string',
                    description: 'the value to set',
                    required: true,
                },
            ],
        },
        DELETE: {
            command: 'clearLocalStorage',
            description: 'Clear the storage.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#get-sessionsessionidlocal_storage',
            deprecated: LOCAL_STORAGE_DEPRECATION_NOTICE,
            parameters: [],
        },
    },
    '/session/:sessionId/local_storage/key/:key': {
        GET: {
            command: 'getLocalStorageItem',
            description: 'Get the storage item for the given key.',
            deprecated: LOCAL_STORAGE_DEPRECATION_NOTICE,
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#get-sessionsessionidlocal_storagekeykey',
            variables: [
                {
                    name: 'key',
                    description: 'the key to get',
                },
            ],
            parameters: [],
            returns: {
                type: 'String',
                name: 'item',
                description: 'The storage item of given key.',
            },
        },
        DELETE: {
            command: 'deleteLocalStorageItem',
            description: '',
            deprecated: LOCAL_STORAGE_DEPRECATION_NOTICE,
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#delete-sessionsessionidlocal_storagekeykey',
            variables: [
                {
                    name: 'key',
                    description: 'the key to remove',
                },
            ],
            parameters: [],
        },
    },
    '/session/:sessionId/local_storage/size': {
        GET: {
            command: 'getLocalStorageSize',
            description: 'Get the number of items in the storage.',
            deprecated: LOCAL_STORAGE_DEPRECATION_NOTICE,
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocal_storagesize',
            parameters: [],
            returns: {
                type: 'Number',
                name: 'itemCnt',
                description: 'The number of items in the storage.',
            },
        },
    },
    '/session/:sessionId/session_storage': {
        GET: {
            command: 'getSessionStorage',
            description: 'Get all keys of the storage.',
            deprecated: SESSION_STORAGE_DEPRECATION_NOTICE,
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#get-sessionsessionidsession_storage',
            parameters: [],
            returns: {
                type: 'String[]',
                name: 'keys',
                description: 'The list of keys.',
            },
        },
        POST: {
            command: 'setSessionStorage',
            description: 'Set the storage item for the given key.',
            deprecated: SESSION_STORAGE_DEPRECATION_NOTICE,
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#post-sessionsessionidsession_storage',
            parameters: [
                {
                    name: 'key',
                    type: 'string',
                    description: 'the key to set',
                    required: true,
                },
                {
                    name: 'value',
                    type: 'string',
                    description: 'the value to set',
                    required: true,
                },
            ],
        },
        DELETE: {
            command: 'clearSessionStorage',
            description: 'Clear the storage.',
            deprecated: SESSION_STORAGE_DEPRECATION_NOTICE,
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#delete-sessionsessionidsession_storage',
            parameters: [],
        },
    },
    '/session/:sessionId/session_storage/key/:key': {
        GET: {
            command: 'getSessionStorageItem',
            description: 'Get the storage item for the given key.',
            deprecated: SESSION_STORAGE_DEPRECATION_NOTICE,
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#get-sessionsessionidsession_storagekeykey',
            variables: [
                {
                    name: 'key',
                    description: 'the key to get',
                },
            ],
            parameters: [],
            returns: {
                type: 'String',
                name: 'item',
                description: 'The storage item of given key.',
            },
        },
        DELETE: {
            command: 'deleteSessionStorageItem',
            description: 'Remove the storage item for the given key.',
            deprecated: SESSION_STORAGE_DEPRECATION_NOTICE,
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#delete-sessionsessionidsession_storagekeykey',
            variables: [
                {
                    name: 'key',
                    description: 'the key to remove',
                },
            ],
            parameters: [],
        },
    },
    '/session/:sessionId/session_storage/size': {
        GET: {
            command: 'getSessionStorageSize',
            description: 'Get the number of items in the storage.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidsession_storagesize',
            deprecated: SESSION_STORAGE_DEPRECATION_NOTICE,
            parameters: [],
            returns: {
                type: 'Number',
                name: 'itemCnt',
                description: 'The number of items in the storage.',
            },
        },
    },
    '/session/:sessionId/log': {
        POST: {
            command: 'getLogs',
            description:
                'Get the log for a given log type. Log buffer is reset after each request.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlog',
            deprecated: LOGS_DEPRECATION_NOTICE,
            parameters: [
                {
                    name: 'type',
                    type: 'string',
                    description: 'the log type',
                    required: true,
                },
            ],
            returns: {
                type: 'Object[]',
                name: 'logs',
                description: 'The list of log entries.',
            },
        },
    },
    '/session/:sessionId/log/types': {
        GET: {
            command: 'getLogTypes',
            description: 'Get available log types.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlogtypes',
            deprecated: LOGS_DEPRECATION_NOTICE,
            parameters: [],
            returns: {
                type: 'String[]',
                name: 'logTypes',
                description: 'The list of available log types.',
            },
        },
    },
    '/session/:sessionId/application_cache/status': {
        GET: {
            command: 'getApplicationCacheStatus',
            description: 'Get the status of the html5 application cache.',
            ref: 'https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidapplication_cachestatus',
            parameters: [],
            deprecated: DEPRECATION_NOTICE,
            returns: {
                type: 'Number',
                name: 'statusCode',
                description:
                    'Status code for application cache: `{UNCACHED = 0, IDLE = 1, CHECKING = 2, DOWNLOADING = 3, UPDATE_READY = 4, OBSOLETE = 5}`',
            },
        },
    },
}
