import { useState } from 'preact/hooks'

const WRAPPER_STYLE = 'avenir white bg-purple h-100 pv5 ph4 tc'
const HEADLINE_STYLE = 'hurricane f1 f-subheadline-m f-headline-l lh-solid'
const TITLE_STYLE = 'f4 f3-ns lh-title measure-narrow center'
const CAVEAT_ANCHOR_STYLE = 'link yellow hover-gold'
const CAVEAT_BASE_STYLE = 'f6 animate'
const COPY_STYLE = 'f4 f3-ns'
const LINK_STYLE = 'link yellow hover-gold'
const EMAIL_ADDRESS = 'mike@cousins.io'
const EMAIL_SUBJECT = encodeURIComponent("I'd like to make something")
const EMAIL_BODY = encodeURIComponent(`Hey Mike!

This is the coolest gift I've ever received. Thank you from the bottom of my heart! You are so thoughtful and also handsome.

Here's what I'd like to make:
<<DESCRIPTION GOES HERE>>
`)

const EMAIL_LINK = `mailto:${EMAIL_ADDRESS}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`

export function App() {
  const [showCaveat, setShowCaveat] = useState(false)
  const handleCaveatClick = (event: MouseEvent) => {
    setShowCaveat(!showCaveat)
    event.preventDefault()
  }

  const caveatStyle = `${CAVEAT_BASE_STYLE} ${
    showCaveat ? 'white pointer' : 'purple'
  }`

  return (
    <div class={WRAPPER_STYLE}>
      <h1 class={HEADLINE_STYLE}>Congratulations!</h1>
      <p class={TITLE_STYLE}>
        You have received a coupon for any three&#8209;dimensional object you
        can imagine
        <a
          href="#caveat"
          class={CAVEAT_ANCHOR_STYLE}
          onClick={handleCaveatClick}
        >
          *
        </a>{' '}
      </p>
      <p
        id="caveat"
        class={caveatStyle}
        onClick={showCaveat ? handleCaveatClick : undefined}
      >
        *subject to the limitations of physics and Mike's 3D printer
      </p>
      <p class={COPY_STYLE}>
        To redeem,{' '}
        <a class={LINK_STYLE} href={EMAIL_LINK}>
          send Mike an email
        </a>
      </p>
    </div>
  )
}
