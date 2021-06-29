---
title: My test article, with a potentially very long title that spans multiple lines
description: This is a test article. It contains all kinds of content, so that we can verify that all the styling stuff and responsive behaviour is working as expected. Not the most beautiful blog article, but it's a start!
date: 2020-03-15
author: Dominique Müller
tags:
  - development
  - react
  - design-systems
---

An introduction to the article could be presented right here.

## Formatting

First up, let's test some basic styling. Sometimes, **things are very important**, and sometimes _things need to be highlighted_ in an
article. From time to time, there is also a [link](https://github.com/) you can click, and such [a link could be potentially quite long](https://github.com/).
From time to time, I might use inline code such as a fictional `runMe()` function you can call, or an even longer code block like
`public class TestMe{}` (or something similar). ~~This is not longer true.~~ If you want, you can use <kbd>Ctrl</kbd> + <kbd>c</kbd> to copy text.

## Lists

Possibly, I might list a few thigs to consider:

- This is a list item that is so long, so incredible long and detailed, so that it spans across multiple lines - how insane is that?!
- Now a shorter second item
  - with
  - nested
  - items
- Followed by a third item, cause why not

There is also the option of ordered lists:

1. First up, let's do a very long long item again, so that we can ensure everything wraps and looks properly across multiple lines
2. Then, a shorter second item
   1. with
   2. nested
   3. items
3. Finally, a third item, who would've guessed

Amazing, those list items. Right?

## Tables

Let's take a look at a table:

| Name      | Description    |
| :-------- | :------------- |
| This item | A good one     |
| That item | Also very good |

## Media

I might even want to include a bunch of imagery, so let's test that.

{{< image src="images/test-image.jpg" alt="Test Image" caption="This is a test image" >}}

Perhaps an image that's rather small?

{{< image src="images/test-image-small.jpg" alt="Small Test Image" caption="This is a small test image" >}}

Looking good, I have to admit.

## Code

Let's take a look at some nice little code snippets:

{{% code title="This is a hello world component" %}}

```tsx
const HelloWorld: FunctionComponent = (): ReactElement => {
  // State
  const message = 'Hello World!';

  // Render
  return <p>{message}</p>;
};
```

{{% /code %}}

Also, testing the scrollbars:

{{% code title="This is a hello world component" %}}

```tsx
const thisIsAVeryLongFunctionNameHowInsaneIsThatTheQuestionIsHowWillItBehaveInTheArticleIAmVeryInterestedInTheAnswerIndeed = () => {
  // TODO: Implementation
};
```

{{% /code %}}
