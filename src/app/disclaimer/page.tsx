import LayoutWrapper from '@/components/LayoutWrapper';

const Disclaimer = () => {
  return (
    <LayoutWrapper className="flex flex-col pb-14">
      <h1 className="mb-5">Legal Disclaimer</h1>
      <div className="mb-10">
        <p className="font-body">
          Manganest is an independent fan-made manga reader that fetches content from the public
          MangaDex API. All manga images, scans, and metadata on Manganest are retrieved in
          real-time from MangaDex&apos;s servers; we do not host or store any manga content
          ourselves.
        </p>
        <p className="font-body">
          Manganest simply provides a reading interface; we make no guarantees about the legality,
          accuracy, or completeness of any content retrieved via MangaDex, and we disclaim any
          liability related to that content.
        </p>
      </div>

      <h2 className="mb-2 text-2xl">Non-Affiliation and Intellectual Property</h2>
      <p className="mb-10 font-body">
        Manganest makes no claims to ownership of the manga content. All manga images, translations,
        and trademarks accessed through Manganest remain the intellectual property of their original
        rights-holders (scanlation groups or publishers). Manganest and its developer, Kinshuk
        Ghildial, claim ownership only of the site&apos;s code, design, and user interface. Any
        copying or redistribution of our proprietary UI or code without permission is prohibited;
        however, any dispute over the manga content itself should be directed to MangaDex or the
        original copyright owner.
      </p>

      <h2 className="mb-2 text-2xl">Content and Hosting Disclaimer</h2>
      <div className="mb-10">
        <p className="font-body">
          Manganest does not host any manga or comic files on its servers. Every image and page
          served on this site comes directly from MangaDex (or linked sources like official chapter
          scans), via the MangaDex API.
        </p>
        <p className="font-body">
          By using Manganest, you acknowledge that we are merely providing an interface to
          third-party content. We are not responsible for the manga content itself, nor do we
          endorse or guarantee it. If you have concerns about copyright infringement, you should
          contact MangaDex or the appropriate rights holder directly; Manganest is not the correct
          venue for legal disputes. The developer assumes no responsibility for any content you
          access on this site.
        </p>
      </div>

      <h2 className="mb-2 text-2xl">Analytics and Future Features</h2>
      <p className="mb-10 font-body">
        Manganest is free to use and does not collect any personal information from visitors. We may
        use standard web analytics to track anonymous usage patterns (page views, interface usage,
        etc.) purely to improve the site&apos;s functionality. These analytics data are aggregated
        and do not personally identify users. The site does not allow users to upload or post manga
        or any other content at any time. In the future we may introduce optional features such as
        user accounts for wishlists or following series, but these will still rely on
        MangaDex&apos;s API for content and will never permit user uploads. We may also add
        non-intrusive advertisements or other monetization (e.g. affiliate links) to help cover
        development and maintenance costs. Any ads will be clearly labeled as third-party content,
        and Manganest (the developer) has no control over advertised material nor any endorsement of
        it.
      </p>

      <h2 className="mb-2 text-2xl">Warranty & Responsibility</h2>
      <div className="mb-10">
        <p className="mb-3 font-body">
          The Manganest website and all its content are provided “as is” and “as available”. We make
          no warranties of any kind regarding the service. Use of Manganest is at your sole risk.
          Specifically:
        </p>
        <ul className="mb-3 list-disc font-body text-base [&_li]:ml-5">
          <li>
            <span className="font-medium">Warranty:</span> Manganest makes no warranty that the site
            will be uninterrupted, secure, or error-free. We do not guarantee the accuracy,
            integrity, or availability of any manga content retrieved through the MangaDex API.
          </li>
          <li>
            <span className="font-medium">Use Responsibly:</span> You acknowledge that you use
            Manganest and read its content at your own discretion and risk. You are responsible for
            ensuring that use of any content complies with applicable law in your jurisdiction.
          </li>
          <li>
            <span className="font-medium">Limitation of Liability:</span> To the fullest extent
            permitted by law, Manganest and its developer shall not be liable for any damages or
            losses (including direct, indirect, incidental, or consequential damages) arising from
            the use or inability to use this site. This includes damages from loss of data,
            interruption of business, or any other harm even if Manganest has been advised of the
            possibility of such damages. In short, we disclaim any legal responsibility for the
            manga content or your use of it.
          </li>
        </ul>
        <p className="font-body">
          These disclaimers and limitations apply regardless of fault, contract, tort, negligence,
          or other legal theory. If any part of this disclaimer is found invalid, the remaining
          parts remain in effect.
        </p>
      </div>

      <h2 className="mb-2 text-2xl">Changes to This Disclaimer</h2>
      <p className="font-body">
        Manganest may update this legal disclaimer at any time (for example, to reflect changes in
        the law or site functionality). We will post the revised version on this page with a new
        “last updated” date. Your continued use of Manganest after any changes indicates your
        acceptance of those changes.
      </p>

      <p className="font-body"> Last updated: May 2025.</p>

      <p className="font-body">
        <span className="font-medium">Sources:</span> Information above is informed by
        MangaDex&apos;s known practices and standard legal guidelines for user-generated-content
        platforms. This disclaimer synthesizes relevant policies and examples to clarify that
        Manganest is independent, non-commercial, and not responsible for manga content it displays.
      </p>
    </LayoutWrapper>
  );
};

export default Disclaimer;
