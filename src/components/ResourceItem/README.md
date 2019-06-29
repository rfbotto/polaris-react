---
name: Resource item
category: Lists and tables
keywords:
  - ResourceItem
  - resource item
  - collections
  - items
  - objects
  - list of products
  - list of orders
  - product lists
  - order lists
  - collections lists
  - collection lists
  - list of collections
  - product listings list
  - channel lists
  - resource list attributes
  - list attributes
  - exceptions list
  - list secondary actions
  - secondary actions in a list
  - list of resources
---

# Resource item

The content of a resource list consists of resource items. Each item summarizes an individual resource and should link to its details page.

Because the content of items depends on the type of resource and merchant tasks, resource items are flexible.

See the case study section for [more about customizing and using resource items](/components/lists-and-tables/resource-list#study-custom-item).

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Resource item anatomy, showing handle, media and details](/public_images/resource-list/item-anatomy-wide@2x.png)

</div>

---

## Required components

The resource item component must be wrapped in a [resource list](/components/lists-and-tables/resource-list) component.

---

## Examples

### Simple resource item

A basic resource item with its details filled in at the point of use.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Blog post list item](/public_images/resource-list/item-example-simple@2x.png)

</div>

```jsx
<Card>
  <ResourceList
    resourceName={{singular: 'blog post', plural: 'blog posts'}}
    items={[
      {
        id: 6,
        url: 'posts/6',
        title: 'How To Get Value From Wireframes',
        author: 'Jonathan Mangrove',
      },
    ]}
    renderItem={(item) => {
      const {id, url, title, author} = item;
      const authorMarkup = author ? <div>by {author}</div> : null;

      return (
        <ResourceItem
          id={id}
          url={url}
          accessibilityLabel={`View details for ${title}`}
        >
          <h3>
            <TextStyle variation="strong">{title}</TextStyle>
          </h3>
          {authorMarkup}
        </ResourceItem>
      );
    }}
  />
</Card>
```

### Item with media

The media element can hold an [avatar](/components/images-and-icons/avatar), [thumbnail](/components/images-and-icons/thumbnail) or other small-format graphic.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Example customer list item](/public_images/resource-list/item-example-media@2x.png)

</div>

```jsx
<Card>
  <ResourceList
    resourceName={{singular: 'customer', plural: 'customers'}}
    items={[
      {
        id: 145,
        url: 'customers/145',
        avatarSource: 'https://avatars.io/twitter/Astro_Soyeon',
        name: 'Yi So-Yeon',
        location: 'Gwangju, South Korea',
      },
    ]}
    renderItem={(item) => {
      const {id, url, avatarSource, name, location} = item;

      return (
        <ResourceItem
          id={id}
          url={url}
          media={
            <Avatar customer size="medium" name={name} source={avatarSource} />
          }
          accessibilityLabel={`View details for ${name}`}
        >
          <h3>
            <TextStyle variation="strong">{name}</TextStyle>
          </h3>
          <div>{location}</div>
        </ResourceItem>
      );
    }}
  />
</Card>
```

### Item with shortcut actions

Shortcut actions present popular actions from the resource’s details page for easy access.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Shortcut actions are shown on hover](/public_images/resource-list/item-example-shortcuts@2x.png)

</div>

```jsx
<Card>
  <ResourceList
    resourceName={{singular: 'customer', plural: 'customers'}}
    items={[
      {
        id: 145,
        url: 'customers/145',
        avatarSource: 'https://avatars.io/twitter/Astro_Soyeon',
        name: 'Yi So-Yeon',
        location: 'Gwangju, South Korea',
        latestOrderUrl: 'orders/1456',
      },
    ]}
    renderItem={(item) => {
      const {id, url, avatarSource, name, location, latestOrderUrl} = item;
      const shortcutActions = latestOrderUrl
        ? [{content: 'View latest order', url: latestOrderUrl}]
        : null;

      return (
        <ResourceItem
          id={id}
          url={url}
          media={
            <Avatar customer size="medium" name={name} source={avatarSource} />
          }
          shortcutActions={shortcutActions}
          accessibilityLabel={`View details for ${name}`}
        >
          <h3>
            <TextStyle variation="strong">{name}</TextStyle>
          </h3>
          <div>{location}</div>
        </ResourceItem>
      );
    }}
  />
</Card>
```

---

## Best practices

Resource items should:

- Perform an action when clicked. The action should navigate to the resource’s details page or otherwise provide more detail about the item.
- Be tailored to the specific type of resource being displayed.
- Lay out the content effectively across all screen sizes.

Resource items can optionally:

- Use [conditional content](/components/lists-and-tables/resource-list#study-custom-item-conditional-content) to help merchants deal with items in unusual states
- Provide [shortcut actions](/components/lists-and-tables/resource-list#study-custom-item-shortcut-actions) for quick access to frequent actions from the resource’s details page

Read the [case study](/components/lists-and-tables/resource-list#study-custom-item) to see how the best practices are applied.

---

## Content guidelines

Resource items should:

- Present the content merchants need to find the items they’re looking for.
- Support merchants’ tasks for the particular type of resource.
- Present content elements concisely. For example, add a label or clarifying phrase only when necessary.
- Avoid truncating content where possible.
- Avoid colons.
- [Conditional actions](/components/lists-and-tables/resource-list#study-custom-item-conditional-content) should follow the verb + noun content formula for buttons.
- If a content value is empty, don’t use an em dash (“—”) like in a table. Instead, use a phrase like “No orders.”
- [Shortcut actions](/components/lists-and-tables/resource-list#study-custom-item-shortcut-actions) don’t need to follow the full verb + noun formula for buttons.

See the [case study](/components/lists-and-tables/resource-list#study-custom-item) for content guidelines in action.
