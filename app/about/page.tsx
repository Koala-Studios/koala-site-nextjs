import GradientHero from "@/components/sections/GradientHero";
import ImageWithText from "@/components/sections/ImageWithText";
import ScrollingText from "@/components/sections/ScrollingText";

export default function Page() {
  return (
    <div style={{ backgroundColor: "#181A17", overflowX: "hidden" }}>
      <GradientHero
        gradient="linear-gradient(45deg, #181a17, #203f44,#433960)"
        title="We work with innovative brands to bring engaging products to life."
      />
      <ScrollingText
        TextArray={[
          "Shopify Ecommerce",
          "UI/UX Design",
          "Web Development",
          "Consulting",
          "3D Renders",
          "Graphic Design",
        ]}
      />
      <ImageWithText
        image_placement={"right"}
        src={"../images/koala_square.png"}
        alt={""}
        title={"Our Mission"}
        imgStyles={{ borderRadius: "1.5rem" }}
      >
        <p style={{ fontFamily: "Poppins-Regular" }}>
          Our mission is to help brands succeed online by providing high-quality
          services that align with their values and goals. At Koala Studios, we
          prioritize quality above all else. We understand that every brand is
          unique, and that&apos;s why we take the time to get to know our
          clients and their values.
          <br />
          <br />
          We believe that a website should not only be visually appealing but
          also reflect the brand&apos;s personality and message. That&apos;s why
          we work closely with our clients to create custom solutions that align
          with their brand&apos;s identity.
          <br />
          <br />
          Thank you for considering Koala Studios for your needs. We look
          forward to helping you take your brand to the next level!
        </p>
      </ImageWithText>
    </div>
  );
}
