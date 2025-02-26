---
name: Modal
category: Overlays
platforms:
  - android
  - ios
  - web
keywords:
  - modal
  - src
  - open
  - title
  - width
  - height
  - primary action
  - secondary action
  - tertiary action
  - destructive action
  - footer
  - instant
  - sectioned
  - large
  - limit height
  - loading
  - outer wrapper
  - iframe
  - overlay
  - easdk
  - embedded app
  - shopify app bridge
  - dialog
  - alert
  - android
  - ios
---

# Modal

Modals are overlays that prevent merchants from interacting with the rest of the application until a specific action is taken. They can be disruptive because they require merchants to take an action before they can continue interacting with the rest of Shopify. It should be used thoughtfully and sparingly.

---

## Use in an embedded application (deprecated)

Passing an API key to the [app provider component](https://polaris.shopify.com/components/structure/app-provider#section-initializing-the-shopify-app-bridge) causes the modal component to delegate to the [Shopify App Bridge](https://help.shopify.com/en/api/embedded-apps/app-bridge) instead of rendering as it would in a stand-alone application.

In an embedded application context, not all documented properties are available. Some properties are only available in stand-alone applications.

Properties that are available only in a stand-alone context are documented as `(stand-alone app use only)`. For instance the `children` property is documented as `(stand-alone app use only)`.

The following example shows the modal component in an embedded application context:

```jsx
class EmbeddedAppModalExample extends React.Component {
  state = {
    modalOpen: false,
  };

  render() {
    return (
      <AppProvider apiKey="YOUR_API_KEY">
        <Modal
          src="https://my-app.com/upgrade-to-retail-package"
          open={this.state.modalOpen}
          title="Upgrade your Shopify POS with the Retail Package"
          primaryAction={{
            content: 'Add Retail Package',
            onAction: () => this.setState({modalOpen: false}),
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: () => this.setState({modalOpen: false}),
            },
          ]}
          onClose={() => this.setState({modalOpen: false})}
        />
      </AppProvider>
    );
  }
}
```

#### Deprecation rationale

As of v3.17.0, using `Modal` in an embedded app is deprecated. Support for this will be removed in v5.0 as the underlying Shopify App Bridge library will be removed from Polaris React. More information can be found [here](https://github.com/Shopify/polaris-react/issues/814). Use `Modal` from `@shopify/app-bridge-react` instead. For example, `import {Modal} from '@shopify/app-bridge-react';`.

---

## Best practices

Use modals when merchants must complete an action before they can continue with the main workflow. Avoid using modals to display complex forms or large amounts of information.

Modals should:

- Require that merchants take an action.
- Close when merchants press the `X` button, the `Cancel` button, or the <kbd>Esc</kbd> key, not when merchants click or tap the area outside the modal.
- Not have more than two buttons (primary and secondary) at the bottom. This prevents unclear action hierarchy and crowding on mobile screens. Since modals are for focused tasks, they should have focused actions. In some cases however, a [tertiary action](#tertiary-actions) may be appropriate.

---

## Content guidelines

### Title

Titles should be:

- Informative and descriptive
  - They should label the type of content grouped in the modal
  - Use a clear {verb}+{noun} question
- Concise and scannable:
  - Use simple, clear language that can be read at a glance
  - Keep headings to single sentence and avoid using punctuation such as periods, commas, or semicolons
  - Avoid articles (the, a, an) in [microcopy headings](/content/grammar-and-mechanics#section-headings-and-subheadings) to keep content short and actionable
  - Written in sentence case (first word capitalized, the rest is lowercase)

<!-- usagelist -->

#### Do

- Edit email address
- Delete customer?
- Discard unsaved changes?

#### Don’t

- Edit the email address for this order
- Are you sure you want to delete customer?
- Discard?

<!-- end -->

### Body content

Body content should be:

- Actionable: start sentences with imperative verbs when telling a merchant what actions are available to them (especially something new). Don’t use permissive language like "you can".

<!-- usagelist -->

#### Do

- Notification emails will be sent to this address.
- This can’t be undone.

#### Don’t

- You can edit the email address where emails will be sent.
- Are you sure you want to delete the variant Dark Blue Tee/Small/Silk? You cannot reverse this.

<!-- end -->

- Structured for merchant success: always put the most critical information first.
- Clear: use the verb “need” to help merchants understand when they’re required to do something.

<!-- usagelist -->

#### Do

- To buy a shipping label, you need to enter the total weight of your shipment, including packaging.

#### Don’t

- To buy a shipping label, you must enter the total weight of your shipment, including packaging.

<!-- end -->

### Primary and secondary actions

Actions should be:

- Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive a merchant by mislabeling an action.

<!-- usagelist -->

#### Do

- Create order
- Buy shipping label

#### Don’t

- New order
- Buy

<!-- end -->

- Action-led: actions should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on actions except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->

#### Do

- Activate Apple Pay
- View shipping settings

#### Don’t

- Try Apple Pay
- View your settings

<!-- end -->

- Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->

#### Do

- Add menu item

#### Don’t

- Add a menu item

<!-- end -->

<a name="tertiary-actions"></a>

### Tertiary actions

Tertiary actions should:

- Only be used when the action requires the context of the content in the modal
- Never be used to dismiss the modal

<!-- usagelist -->

#### Do

- Use a plain button for a tertiary action if needed
  ![Screenshot of modal with a plain button as a tertiary action](/public_images/components/Modal/do-use-plain-button-for-tertiary-action@2x.png)

#### Don’t

- Use a tertiary action for a destructive action
  ![Screenshot of modal with a destructive button as a tertiary action](/public_images/components/Modal/dont-use-destructive-tertiary-action@2x.png)

<!-- end -->

### Footer

Body content should be:

- Actionable: start sentences with imperative verbs when telling a merchant what actions are available to them (especially something new). Don’t use permissive language like "you can".

<!-- usagelist -->

#### Do

- Notification emails will be sent to this address.

#### Don’t

- You can edit the email address where emails will be sent.

<!-- end -->

- Structured for merchant success: always put the most critical information first.
- Clear: use the verb “need” to help merchants understand when they’re required to do something.

<!-- usagelist -->

#### Do

- To buy a shipping label, you need to enter the total weight of your shipment, including packaging.

#### Don’t

- To buy a shipping label, you must enter the total weight of your shipment, including packaging.

<!-- end -->

---

## Examples

### Basic modal

<!-- example-for: web -->

Use as the default option for a modal.

```jsx
class ModalExample extends React.Component {
  state = {
    active: true,
  };

  render() {
    const {active} = this.state;

    return (
      <div style={{height: '500px'}}>
        <Button onClick={this.handleChange}>Open</Button>
        <Modal
          open={active}
          onClose={this.handleChange}
          title="Reach more shoppers with Instagram product tags"
          primaryAction={{
            content: 'Add Instagram',
            onAction: this.handleChange,
          }}
          secondaryActions={[
            {
              content: 'Learn more',
              onAction: this.handleChange,
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                Use Instagram posts to share your products with millions of
                people. Let shoppers buy from your store without leaving
                Instagram.
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </div>
    );
  }

  handleChange = () => {
    this.setState(({active}) => ({active: !active}));
  };
}
```

### Modal with primary action

Use to let merchants take a key action.

```jsx
const DISCOUNT_LINK = 'https://polaris.shopify.com/';

class ModalExample extends React.Component {
  state = {
    active: true,
  };

  node = null;

  render() {
    const {active} = this.state;

    return (
      <div style={{height: '500px'}}>
        <Button onClick={this.toggleModal}>Open</Button>
        <Modal
          open={active}
          onClose={this.toggleModal}
          title="Get a shareable link"
          primaryAction={{
            content: 'Close',
            onAction: this.toggleModal,
          }}
        >
          <Modal.Section>
            <Stack>
              <Stack.Item>
                <TextContainer>
                  <p>
                    You can share this discount link with your customers via
                    email or social media. Your discount will be automatically
                    applied at checkout.
                  </p>
                </TextContainer>
              </Stack.Item>
              <Stack.Item fill>
                <TextField
                  ref={this.bindNode}
                  label="Discount link"
                  onFocus={this.handleFocus}
                  value={DISCOUNT_LINK}
                  onChange={() => {}}
                  connectedRight={
                    <Button primary onClick={this.handleClick}>
                      Copy link
                    </Button>
                  }
                />
              </Stack.Item>
            </Stack>
          </Modal.Section>
        </Modal>
      </div>
    );
  }

  handleClick = () => {
    if (this.node == null) {
      return;
    }
    this.node.input.focus();
  };

  handleFocus = () => {
    if (this.node == null) {
      return;
    }
    this.node.input.select();
    document.execCommand('copy');
  };

  toggleModal = () => {
    this.setState(({active}) => ({active: !active}));
  };

  bindNode = (node) => {
    if (node == null) {
      return;
    }
    this.node = node;
  };
}
```

<!-- content-for: android -->

![Modal with primary action on Android](/public_images/components/Modal/android/information@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Modal with primary action on iOS](/public_images/components/Modal/ios/information@2x.png)

<!-- /content-for -->

### Modal with primary and secondary actions

Use to let merchants take key actions at the bottom of the modal.

```jsx
const CURRENT_PAGE = 'current_page';
const ALL_CUSTOMERS = 'all_customers';
const SELECTED_CUSTOMERS = 'selected_customers';
const CSV_EXCEL = 'csv_excel';
const CSV_PLAIN = 'csv_plain';

class ModalExample extends React.Component {
  state = {
    active: true,
    selectedExport: [],
    selectedExportAs: [],
  };

  render() {
    const {active, selectedExport, selectedExportAs} = this.state;

    return (
      <div style={{height: '500px'}}>
        <Button onClick={this.handleModalChange}>Open</Button>
        <Modal
          open={active}
          onClose={this.handleClose}
          title="Export customers"
          primaryAction={{
            content: 'Export customers',
            onAction: this.handleClose,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: this.handleClose,
            },
          ]}
        >
          <Modal.Section>
            <Stack vertical>
              <Stack.Item>
                <ChoiceList
                  title={'Export'}
                  choices={[
                    {label: 'Current page', value: CURRENT_PAGE},
                    {label: 'All customers', value: ALL_CUSTOMERS},
                    {label: 'Selected customers', value: SELECTED_CUSTOMERS},
                  ]}
                  selected={selectedExport}
                  onChange={this.handleCheckboxChange('selectedExport')}
                />
              </Stack.Item>
              <Stack.Item>
                <ChoiceList
                  title={'Export as'}
                  choices={[
                    {
                      label:
                        'CSV for Excel, Numbers, or other spreadsheet programs',
                      value: CSV_EXCEL,
                    },
                    {label: 'Plain CSV file', value: CSV_PLAIN},
                  ]}
                  selected={selectedExportAs}
                  onChange={this.handleCheckboxChange('selectedExportAs')}
                />
              </Stack.Item>
            </Stack>
          </Modal.Section>
        </Modal>
      </div>
    );
  }

  handleModalChange = () => {
    this.setState(({active}) => ({active: !active}));
  };

  handleClose = () => {
    this.setState(({active}) => ({
      active: !active,
      selectedExport: [],
      selectedExportAs: [],
    }));
  };

  handleCheckboxChange = (key) => {
    return (value) => this.setState({[key]: value});
  };
}
```

<!-- content-for: android -->

![Modal with primary and secondary actions on Android](/public_images/components/Modal/android/basic@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Modal with primary and secondary actions on iOS](/public_images/components/Modal/ios/basic@2x.png)

<!-- /content-for -->

### Large modal

<!-- example-for: web -->

Use when you need to increase the width of your modal.

```jsx
class ModalExample extends React.Component {
  state = {
    active: true,
    checked: false,
  };

  render() {
    const {active, checked} = this.state;

    return (
      <div style={{height: '500px'}}>
        <Button onClick={this.handleChange}>Open</Button>
        <Modal
          large
          open={active}
          onClose={this.handleChange}
          title="Import customers by CSV"
          primaryAction={{
            content: 'Import customers',
            onAction: this.handleChange,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: this.handleChange,
            },
          ]}
        >
          <Modal.Section>
            <Stack vertical>
              <DropZone
                accept=".csv"
                errorOverlayText="File type must be .csv"
                type="file"
                onDrop={() => {}}
              >
                <DropZone.FileUpload />
              </DropZone>
              <Checkbox
                checked={checked}
                label="Overwrite existing customers that have the same email or phone"
                onChange={this.handleCheckbox}
              />
            </Stack>
          </Modal.Section>
        </Modal>
      </div>
    );
  }

  handleChange = () => {
    this.setState(({active}) => ({active: !active}));
  };

  handleCheckbox = (value) => {
    this.setState({checked: value});
  };
}
```

### Modal without a title

<!-- example-for: web -->

We recommend you add a title to your modal, but you may leave it blank.

```jsx
class ModalExample extends React.Component {
  state = {
    active: true,
  };

  render() {
    const {active} = this.state;

    return (
      <div style={{height: '500px'}}>
        <Button onClick={this.handleChange}>Open</Button>
        <Modal
          open={active}
          onClose={this.handleChange}
          primaryAction={{
            content: 'Add Instagram',
            onAction: this.handleChange,
          }}
          secondaryActions={[
            {
              content: 'Learn more',
              onAction: this.handleChange,
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                Use Instagram posts to share your products with millions of
                people. Let shoppers buy from your store without leaving
                Instagram.
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </div>
    );
  }

  handleChange = () => {
    this.setState(({active}) => ({active: !active}));
  };
}
```

### Modal with scroll listener

<!-- example-for: web -->

Use to implement infinite scroll of modal content.

```jsx
class ModalExample extends React.Component {
  state = {
    active: true,
  };

  render() {
    const {active} = this.state;

    return (
      <div style={{height: '500px'}}>
        <Button onClick={this.handleChange}>Open</Button>
        <Modal
          open={active}
          title="Scrollable content"
          onClose={this.toggleModalVisibility}
          onScrolledToBottom={() => alert('Scrolled to bottom')}
        >
          {Array.from({length: 50}, (_, index) => (
            <Modal.Section key={index}>
              <TextContainer>
                <p>Item #{index}</p>
              </TextContainer>
            </Modal.Section>
          ))}
        </Modal>
      </div>
    );
  }

  toggleModalVisibility = () => {
    this.setState(({active}) => ({active: !active}));
  };
}
```

### Warning modal

<!-- example-for: android, ios -->

Use to make it clear to the merchant that the action is potentially dangerous. Only use this option when the merchant is about to perform an action that can’t be undone or is difficult to undo.

<!-- content-for: android -->

![Warning modal on Android](/public_images/components/Modal/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Warning modal on iOS](/public_images/components/Modal/ios/default@2x.png)

<!-- /content-for -->

---

## Related components

- To present large amounts of additional information or actions that don’t require confirmation, [use the collapsible component](/components/behavior/collapsible) to expand content in place within the page
- To present a small amount of content or a menu of actions in a non-blocking overlay, [use the popover component](/components/popover)
- To communicate a change or condition that needs the merchant’s attention within the context of a page, [use the banner component](/components/feedback-indicators/banner)

---

## Accessibility

<!-- content-for: android -->

See Material Design and development documentation about accessibility for Android:

- [Accessible design on Android](https://material.io/design/usability/accessibility.html)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility/)

<!-- /content-for -->

<!-- content-for: ios -->

See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

<!-- /content-for -->

<!-- content-for: web -->

- Modals use ARIA `role=”dialog”` to convey to screen reader users that they work like native dialog windows.
- If you set the `title` prop to give the modal component a heading, then the `title` is used to label the dialog element with `aria-labelledby`. This helps to convey the purpose of the modal to screen reader users when it displays.

### Keyboard support

- When a modal opens, focus moves automatically to the modal container so it can be accessed by keyboard users
- While the modal is open, keyboard focus shouldn’t leave the modal
- Merchants can dismiss the modal with the keyboard by activating the `X` button, the `Cancel` button if one is provided, or by pressing the <kbd>Esc</kbd> key
- After a modal is closed, focus returns to the button that launched it

<!-- /content-for -->
