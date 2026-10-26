import Image from "next/image";
import type { ReactNode } from "react";

import type { BlogFigureKey } from "@/lib/content";

import styles from "./LeakFigure.module.css";

/*
 * Before/after phone mock-ups for the store-leak posts. The screens are HTML so
 * they stay sharp and readable by screen readers through each figure's caption;
 * the products are packshots of Fernlow, an invented brand.
 */

const packs = {
  greens: "/images/blog/fernlow/daily-greens.jpg",
  trial: "/images/blog/fernlow/trial-pack.jpg",
  samplesBefore: "/images/blog/fernlow/sample-pack-before.jpg",
  samplesAfter: "/images/blog/fernlow/sample-pack-after.jpg",
};

type PackName = keyof typeof packs;

/** A Fernlow product photo, sized by the class it's given. */
function Pack({ name = "greens", className }: { name?: PackName; className?: string }) {
  return <Image alt="" className={className} height={600} sizes="12rem" src={packs[name]} width={600} />;
}

function Phone({ children, url }: { children: ReactNode; url?: string }) {
  return (
    <div className={styles.phone}>
      <div className={styles.bar}>
        <span className={styles.url}>{url ?? "fernlow.com"}</span>
      </div>
      <div className={styles.screen}>{children}</div>
    </div>
  );
}

function Shot({ pack, children }: { pack?: PackName; children?: ReactNode }) {
  return (
    <div className={styles.shot}>
      <Pack className={styles.tub} name={pack} />
      {children}
    </div>
  );
}

function Lines({ count = 3, short }: { count?: number; short?: boolean }) {
  return (
    <div className={styles.lines} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span key={index} style={{ width: index === count - 1 || short ? "62%" : undefined }} />
      ))}
    </div>
  );
}

/** Marks the part of a mock-up the caption is talking about. */
function Mark({ tone, tag, children }: { tone: "bad" | "good"; tag?: string; children: ReactNode }) {
  return (
    <div className={`${styles.mark} ${tone === "bad" ? styles.bad : styles.good}`}>
      {children}
      {tag ? <span className={styles.tag}>{tag}</span> : null}
    </div>
  );
}

function Panel({ tone, title, caption, children }: { tone: "bad" | "good"; title: string; caption: string; children: ReactNode }) {
  return (
    <div className={styles.panel}>
      <p className={`${styles.label} ${tone === "bad" ? styles.labelBad : styles.labelGood}`}>{title}</p>
      {children}
      <p className={styles.caption}>{caption}</p>
    </div>
  );
}

function Pair({ before, after, alt }: { before: ReactNode; after: ReactNode; alt: string }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.pair} aria-hidden="true">
        {before}
        <span className={styles.arrow}>→</span>
        {after}
      </div>
      <figcaption className="koala-sr-only">{alt}</figcaption>
    </figure>
  );
}

const before = "What the shopper sees";
const after = "After the fix";

function Shipping() {
  return (
    <Pair
      alt="Before: the banner promises free shipping on every order while the note under the button says free shipping only over $75. After: one rule, shown under the price with how far the shopper is from it."
      before={
        <Panel caption="The banner and the note under the button disagree." title={before} tone="bad">
          <Phone>
            <Mark tag="Promise 1" tone="bad">
              <div className={styles.announce}>Free shipping on every order</div>
            </Mark>
            <Shot />
            <p className={styles.ptitle}>Daily Greens</p>
            <p className={styles.price}>$49</p>
            <div className={styles.btn}>Add to cart</div>
            <Mark tag="Promise 2" tone="bad">
              <p className={styles.note}>Free shipping on orders over $75</p>
            </Mark>
          </Phone>
        </Panel>
      }
      after={
        <Panel caption="One rule, right where the price is." title={after} tone="good">
          <Phone>
            <div className={styles.announce}>Free shipping over $75</div>
            <Shot />
            <p className={styles.ptitle}>Daily Greens</p>
            <p className={styles.price}>$49</p>
            <Mark tone="good">
              <p className={styles.note}>
                <strong>Free shipping over $75.</strong> You’re $26 away.
              </p>
            </Mark>
            <div className={styles.btn}>Add to cart</div>
          </Phone>
        </Panel>
      }
    />
  );
}

function SoldOut() {
  return (
    <Pair
      alt="Before: the homepage button leads to a sold-out trial pack with a grey button. After: the sold-out page says when it returns, offers a notification and points to an in-stock starter bundle."
      before={
        <Panel caption="The homepage’s main button ends at a grey one." title={before} tone="bad">
          <Phone>
            <div className={styles.hero}>
              <p>Try it for 7 days</p>
              <span>Shop the trial</span>
            </div>
            <p className={styles.tap}>↓ tap</p>
            <Shot pack="trial" />
            <p className={styles.ptitle}>Trial pack</p>
            <Mark tag="Dead end" tone="bad">
              <div className={`${styles.btn} ${styles.btnOff}`}>Sold out</div>
            </Mark>
          </Phone>
        </Panel>
      }
      after={
        <Panel caption="The sold-out page sends them somewhere they can buy." title={after} tone="good">
          <Phone>
            <Shot pack="trial" />
            <p className={styles.ptitle}>Trial pack</p>
            <p className={styles.note}>Back on November 12.</p>
            <div className={`${styles.btn} ${styles.btnGhost}`}>Email me when it’s back</div>
            <Mark tone="good">
              <div className={styles.card}>
                <Pack className={styles.cardTub} />
                <div>
                  <p className={styles.cardKicker}>Most people start with</p>
                  <p className={styles.cardTitle}>Starter Bundle · $39</p>
                </div>
              </div>
            </Mark>
          </Phone>
        </Panel>
      }
    />
  );
}

function DeadLink() {
  return (
    <Pair
      alt="Before: a homepage button opens an address ending in -draft and shows Page not found. After: the same button opens the published guide."
      before={
        <Panel caption="Fine in the theme editor, broken for every shopper." title={before} tone="bad">
          <Phone url="fernlow.com/pages/starter-guide-draft">
            <Mark tag="404" tone="bad">
              <div className={styles.error}>
                <p className={styles.errorCode}>404</p>
                <p>Page not found</p>
              </div>
            </Mark>
            <div className={`${styles.btn} ${styles.btnGhost}`}>Continue shopping</div>
          </Phone>
        </Panel>
      }
      after={
        <Panel caption="The button points at the live page, and the old address redirects." title={after} tone="good">
          <Phone url="fernlow.com/pages/starter-guide">
            <Mark tone="good">
              <p className={styles.articleTitle}>Which one is right for you?</p>
            </Mark>
            <Lines count={4} />
            <Shot />
            <Lines count={2} />
          </Phone>
        </Panel>
      }
    />
  );
}

function SamplePack() {
  return (
    <Pair
      alt="Before: the four-flavour sample pack leaves out chocolate, the flavour with 3,200 reviews, and its own reviews ask for more flavours. After: chocolate is in the pack."
      before={
        <Panel caption="The flavour most regulars buy isn’t in the box." title={before} tone="bad">
          <Phone>
            <Shot pack="samplesBefore" />
            <p className={styles.ptitle}>Sample pack · 4 flavours</p>
            <Mark tag="Missing" tone="bad">
              <p className={styles.note}>Chocolate · ★ 4.9 · 3,200 reviews</p>
            </Mark>
            <div className={styles.review}>
              <span>★★★★☆</span> Wish it had chocolate!
            </div>
          </Phone>
        </Panel>
      }
      after={
        <Panel caption="The best seller leads the pack." title={after} tone="good">
          <Phone>
            <Mark tone="good">
              <Shot pack="samplesAfter" />
            </Mark>
            <p className={styles.ptitle}>Sample pack · 4 flavours</p>
            <p className={styles.note}>
              <strong>Includes our best seller, Chocolate.</strong>
            </p>
            <div className={styles.btn}>Add to cart</div>
          </Phone>
        </Panel>
      }
    />
  );
}

function Option({ name, price, sub, selected, chip }: { name: string; price: string; sub?: string; selected?: boolean; chip?: string }) {
  return (
    <div className={`${styles.option} ${selected ? styles.optionOn : ""}`}>
      <span className={styles.radio} />
      <span className={styles.optionName}>
        {name}
        {chip ? <span className={styles.chip}>{chip}</span> : null}
        {sub ? <span className={styles.optionSub}>{sub}</span> : null}
      </span>
      <span className={styles.optionPrice}>{price}</span>
    </div>
  );
}

function PerMonth() {
  return (
    <Pair
      alt="Before: options show $45, $40.50 and $114, so the 3-month supply looks most expensive. After: every option shows a monthly price, and the 3-month supply is marked best value at $38 a month, saving $21."
      before={
        <Panel caption="The cheapest option per month looks like the dearest." title={before} tone="bad">
          <Phone>
            <p className={styles.ptitle}>Daily Greens</p>
            <Option name="One-time" price="$45" selected />
            <Option name="Subscribe" price="$40.50" />
            <Mark tag="Looks dearest" tone="bad">
              <Option name="3-month supply" price="$114" />
            </Mark>
            <div className={styles.btn}>Add to cart</div>
          </Phone>
        </Panel>
      }
      after={
        <Panel caption="The page does the division for them." title={after} tone="good">
          <Phone>
            <p className={styles.ptitle}>Daily Greens</p>
            <Option name="One-time" price="$45/mo" />
            <Option name="Subscribe" price="$40.50/mo" />
            <Mark tone="good">
              <Option chip="Best value" name="3-month supply" price="$38/mo" selected sub="$114 total · save $21" />
            </Mark>
            <div className={styles.btn}>Add to cart</div>
          </Phone>
        </Panel>
      }
    />
  );
}

function SummaryLine() {
  return (
    <Pair
      alt="Before: the flavour, size and delivery choices have scrolled off screen when the shopper reaches Add to cart. After: one line above the button repeats 2 bags, Chocolate, every 4 weeks, $78."
      before={
        <Panel caption="By the button, the choices have scrolled away." title={before} tone="bad">
          <Phone>
            <div className={styles.faded}>
              <p className={styles.small}>Flavour · Size · Delivery</p>
              <Option name="Every 4 weeks" price="" selected />
            </div>
            <p className={styles.small}>Free gift</p>
            <div className={styles.swatches}>
              <span />
              <span />
              <span />
            </div>
            <Mark tag="What did I pick?" tone="bad">
              <div className={styles.btn}>Add to cart</div>
            </Mark>
          </Phone>
        </Panel>
      }
      after={
        <Panel caption="One line repeats the choices and the total." title={after} tone="good">
          <Phone>
            <div className={styles.faded}>
              <p className={styles.small}>Flavour · Size · Delivery</p>
              <Option name="Every 4 weeks" price="" selected />
            </div>
            <p className={styles.small}>Free gift</p>
            <div className={styles.swatches}>
              <span />
              <span />
              <span />
            </div>
            <Mark tone="good">
              <p className={styles.summary}>2 bags · Chocolate · every 4 weeks · $78</p>
            </Mark>
            <div className={styles.btn}>Add to cart</div>
          </Phone>
        </Panel>
      }
    />
  );
}

function Timeline({ reminder }: { reminder?: boolean }) {
  return (
    <div className={styles.timeline}>
      <span className={styles.tick} style={{ left: "0%" }}>
        <i />
        Day 0<br />
        order
      </span>
      {reminder ? (
        <span className={`${styles.tick} ${styles.tickGood}`} style={{ left: "72%" }}>
          <i />
          Day 25<br />
          reminder
        </span>
      ) : null}
      <span className={`${styles.tick} ${reminder ? "" : styles.tickBad}`} style={{ left: "100%" }}>
        <i />
        Day 30<br />
        runs out
      </span>
    </div>
  );
}

function ReorderEmail() {
  return (
    <Pair
      alt="Before: between the order on day 0 and the tub running out on day 30, nothing is sent. After: on day 25 an email asks Running low? with the one-time and subscription prices and a single reorder button."
      before={
        <Panel caption="Thirty days of silence, then they run out." title={before} tone="bad">
          <Phone url="Inbox">
            <Timeline />
            <Mark tag="Nothing sent" tone="bad">
              <div className={styles.inbox}>
                <p>No new mail from Fernlow</p>
              </div>
            </Mark>
            <Lines count={3} />
          </Phone>
        </Panel>
      }
      after={
        <Panel caption="A short email five days before the tub is empty." title={after} tone="good">
          <Phone url="Inbox">
            <Timeline reminder />
            <Mark tone="good">
              <div className={styles.email}>
                <p className={styles.emailSubject}>Running low on Daily Greens?</p>
                <Pack className={styles.emailTub} />
                <p className={styles.note}>$49 one-time · $44.10 when you subscribe</p>
                <div className={styles.btn}>Reorder</div>
              </div>
            </Mark>
          </Phone>
        </Panel>
      }
    />
  );
}

function GuideToProduct() {
  return (
    <Pair
      alt="Before: a buying guide ends with no product, and the reader has to go and find it. After: the guide ends with a product card showing the starter pack, what is in it, the price and an add to cart button."
      before={
        <Panel caption="The guide answers the question, then just ends." title={before} tone="bad">
          <Phone url="fernlow.com/blogs/which-greens">
            <p className={styles.articleTitle}>Which greens powder is right for you?</p>
            <Lines count={5} />
            <Lines count={3} />
            <Mark tag="Page ends" tone="bad">
              <p className={styles.small}>Thanks for reading.</p>
            </Mark>
          </Phone>
        </Panel>
      }
      after={
        <Panel caption="The answer comes with the product, ready to buy." title={after} tone="good">
          <Phone url="fernlow.com/blogs/which-greens">
            <p className={styles.articleTitle}>Which greens powder is right for you?</p>
            <Lines count={4} />
            <Mark tone="good">
              <div className={styles.product}>
                <Pack className={styles.productTub} />
                <div>
                  <p className={styles.cardTitle}>Starter Pack</p>
                  <p className={styles.small}>2 tubs + shaker · $59</p>
                </div>
              </div>
              <div className={styles.btn}>Add to cart</div>
            </Mark>
          </Phone>
        </Panel>
      }
    />
  );
}

const figures: Record<BlogFigureKey, () => ReactNode> = {
  shipping: Shipping,
  soldOut: SoldOut,
  deadLink: DeadLink,
  samplePack: SamplePack,
  perMonth: PerMonth,
  summaryLine: SummaryLine,
  reorderEmail: ReorderEmail,
  guideToProduct: GuideToProduct,
};

export function LeakFigure({ figure }: { figure: BlogFigureKey }) {
  const Figure = figures[figure];
  return <Figure />;
}
