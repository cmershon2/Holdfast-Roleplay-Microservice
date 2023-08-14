import nodemailer from "nodemailer";

async function sendInviteEmail(email: string, inviteToken: string): Promise<object> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const mailOptions = {
    from: `Holdfast Roleplay Admin <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: 'Invitation to Holdfast Roleplay Admin',
    html: `
    <!doctype html>
    <html ⚡4email data-css-strict>
      <head>
          <meta charset="utf-8">
          <style amp4email-boilerplate>body{visibility:hidden}</style>
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <style amp-custom>u ~ div img + div > div { display:none;}span.MsoHyperlink, span.MsoHyperlinkFollowed { color:inherit;}a.es-button { text-decoration:none;}.es-desk-hidden { display:none; float:left; overflow:hidden; width:0; max-height:0; line-height:0;}.es-header-body a:hover { color:#000000;}.es-content-body a:hover { color:#391484;}.es-footer-body a:hover { color:#391484;}.es-infoblock a:hover { color:#CCCCCC;}.es-button-border:hover > a.es-button { color:#000000;}.es-menu.es-table-not-adapt td a:hover, a.es-button:hover { text-decoration:underline;}td .es-button-border:hover a.es-button-5697 { color:#FFFFFF; border-color:undefined;}td .es-button-border-7997:hover { border-color:undefined;}body { width:100%; height:100%;}table { border-collapse:collapse; border-spacing:0px;}table td, body, .es-wrapper { padding:0; Margin:0;}.es-content, .es-header, .es-footer { width:100%; table-layout:fixed;}p, hr { Margin:0;}h1, h2, h3, h4, h5, h6 { Margin:0; font-family:"Exo 2", sans-serif; letter-spacing:0;}.es-left { float:left;}.es-right { float:right;}.es-menu td { border:0;}s { text-decoration:line-through;}a { text-decoration:underline;}.es-menu td a { font-family:"Exo 2", sans-serif; text-decoration:none; display:block;}.es-menu amp-img, .es-button amp-img { vertical-align:middle;}.es-wrapper { width:100%; height:100%;}.es-wrapper-color, .es-wrapper { background-color:#1F2937;}.es-content-body p, .es-footer-body p, .es-header-body p, .es-infoblock p { font-family:"Exo 2", sans-serif; line-height:150%; letter-spacing:0;}.es-header { background-color:transparent;}.es-header-body { background-color:transparent;}.es-header-body p { color:#DDDDDD; font-size:18px;}.es-header-body a { color:#000000; font-size:18px;}.es-footer { background-color:transparent;}.es-footer-body { background-color:transparent;}.es-footer-body p { color:#666666; font-size:16px;}.es-footer-body a { color:#391484; font-size:16px;}.es-content-body { background-color:transparent;}.es-content-body p { color:#666666; font-size:18px;}.es-content-body a { color:#391484; font-size:18px;}.es-infoblock p { font-size:12px; color:#CCCCCC;}.es-infoblock a { font-size:12px; color:#CCCCCC;}h1 { font-size:36px; font-style:normal; font-weight:bold; line-height:120%; color:#000000;}h2 { font-size:28px; font-style:normal; font-weight:bold; line-height:120%; color:#000000;}h3 { font-size:20px; font-style:normal; font-weight:normal; line-height:120%; color:#000000;}h4 { font-size:24px; font-style:normal; font-weight:normal; line-height:120%; color:#333333;}h5 { font-size:20px; font-style:normal; font-weight:normal; line-height:120%; color:#333333;}h6 { font-size:16px; font-style:normal; font-weight:normal; line-height:120%; color:#333333;}.es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px;}.es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:28px;}.es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px;}.es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px;}.es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px;}.es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px;}a.es-button, button.es-button { padding:15px 30px 15px 30px; display:inline-block; background:#FFDDA9; border-radius:30px 30px 30px 30px; font-size:20px; font-family:"Exo 2", sans-serif; font-weight:normal; font-style:normal; line-height:120%; color:#000000; text-decoration:none; width:auto; text-align:center; letter-spacing:0;}.es-button-border { border-style:solid; border-color:#FFDDA9 #FFDDA9 #FFDDA9 #FFDDA9; background:#FFDDA9; border-width:0px 0px 2px 0px; display:inline-block; border-radius:30px 30px 30px 30px; width:auto;}.es-button img { display:inline-block; vertical-align:middle;}.es-fw, .es-fw .es-button { display:block;}.es-il, .es-il .es-button { display:inline-block;}.es-p30t { padding-top:30px;}.es-p40r { padding-right:40px;}.es-p40l { padding-left:40px;}.es-p40 { padding:40px;}.es-p20 { padding:20px;}.es-p5t { padding-top:5px;}@media only screen and (max-width:600px) {td.es-m-p15r { padding-right:15px } td.es-m-p15l { padding-left:15px } td.es-m-p15r { padding-right:15px } td.es-m-p15l { padding-left:15px } td.es-m-p30t { padding-top:30px } td.es-m-p20r { padding-right:20px } td.es-m-p30b { padding-bottom:30px } td.es-m-p20l { padding-left:20px } *[class="gmail-fix"] { display:none } p, a { line-height:150% } h1, h1 a { line-height:120% } h2, h2 a { line-height:120% } h3, h3 a { line-height:120% } h4, h4 a { line-height:120% } h5, h5 a { line-height:120% } h6, h6 a { line-height:120% } h1 { font-size:28px; text-align:left } h2 { font-size:24px; text-align:left } h3 { font-size:20px; text-align:left } h4 { font-size:24px; text-align:left } h5 { font-size:20px; text-align:left } h6 { font-size:16px; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:28px } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px } .es-menu td a { font-size:16px } .es-header-body p, .es-header-body a { font-size:16px } .es-content-body p, .es-content-body a { font-size:16px } .es-footer-body p, .es-footer-body a { font-size:16px } .es-infoblock p, .es-infoblock a { font-size:12px } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left } .es-m-txt-r amp-img { float:right } .es-m-txt-c amp-img { margin:0 auto } .es-m-txt-l amp-img { float:left } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline } .es-m-txt-r .rollover div, .es-m-txt-c .rollover div, .es-m-txt-l .rollover div { line-height:0; font-size:0 } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:20px } a.es-button, button.es-button { display:inline-block } .es-button-border { display:inline-block } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block } .es-adaptive table, .es-left, .es-right { width:100% } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%; max-width:600px } .adapt-img { width:100%; height:auto } .es-mobile-hidden, .es-hidden { display:none } .es-desk-hidden { width:auto; overflow:visible; float:none; max-height:inherit; line-height:inherit } tr.es-desk-hidden { display:table-row } table.es-desk-hidden { display:table } td.es-desk-menu-hidden { display:table-cell } .es-menu td { width:1% } table.es-table-not-adapt, .esd-block-html table { width:auto } .es-social td { padding-bottom:10px } .h-auto { height:auto } .m-c-p16r { padding-right:8vw } }</style>
      </head>
      <body>
          <div class="es-wrapper-color">
            <!--<[if gte mso 9]> <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#1f2937"></v:fill> </v:background> <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="background-position: center top">
                <tr>
                  <td valign="top">
                      <table class="es-header" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                            <td class="es-m-p15r es-m-p15l" align="center">
                              <table class="es-header-body" width="640" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                  <tr>
                                    <td class="es-p30t es-p40r es-p40l" align="left">
                                        <table cellpadding="0" cellspacing="0" width="100%">
                                          <tr>
                                              <td width="560" align="center" valign="top">
                                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                    <tr class="es-mobile-hidden">
                                                      <td align="center" height="15"></td>
                                                    </tr>
                                                </table>
                                              </td>
                                          </tr>
                                        </table>
                                    </td>
                                  </tr>
                              </table>
                            </td>
                        </tr>
                      </table>
                      <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                        <tr>
                            <td class="es-m-p15r es-m-p15l" align="center" bgcolor="transparent" style="background-color:transparent">
                              <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="640" style="border-collapse:separate">
                                  <tr>
                                    <td class="es-p30t es-p40r es-p40l" align="left">
                                        <table cellpadding="0" cellspacing="0" width="100%">
                                          <tr>
                                              <td width="560" align="center" valign="top">
                                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                    <tr>
                                                      <td align="center" height="15"></td>
                                                    </tr>
                                                </table>
                                              </td>
                                          </tr>
                                        </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="es-p40 es-m-p30t es-m-p30b es-m-p20r es-m-p20l" align="left" bgcolor="#ffffff" style="background-color:#ffffff;border-radius:20px">
                                        <table cellpadding="0" cellspacing="0" width="100%">
                                          <tr>
                                              <td width="560" align="left">
                                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                    <tr>
                                                      <td align="center" style="font-size: 0">
                                                          <img class="adapt-img" src="${process.env.NEXTAUTH_URL}/logo.png" alt="" width="100" height="100" layout="responsive"></img>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td align="center" class="es-p20" style="font-size: 0">
                                                          <table border="0" width="100%" cellpadding="0" cellspacing="0" class="es-spacer" role="presentation">
                                                            <tr>
                                                                <td style="border-bottom: 1px solid #cccccc;;background: none;height: 1px;width: 100%;margin: 0px 0px 0px 0px"></td>
                                                            </tr>
                                                          </table>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td align="center">
                                                          <h1>Holdfast Roleplay Admin</h1>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td align="center" class="es-p5t">
                                                          <p>You have been invited to manage a Holdfast Roleplay Admin panel. This invite will expire in 48 hours.</p>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td align="center" class="es-p30t">
                                                          <!--[if mso]>
                                                          <a href="${process.env.NEXTAUTH_URL}/accept-invite?token=${inviteToken}" target="_blank" hidden>
                                                            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="${process.env.NEXTAUTH_URL}/accept-invite?token=${inviteToken}" style="height:54px; v-text-anchor:middle; width:197px" arcsize="50%" stroke="f" fillcolor="#0891b2">
                                                                <w:anchorlock></w:anchorlock>
                                                                <center style='color:#ffffff; font-family:"Exo 2", sans-serif; font-size:20px; font-weight:400; line-height:20px; mso-text-raise:1px'>Create Account</center>
                                                            </v:roundrect>
                                                          </a>
                                                          <![endif]--> <!--[if !mso]--> <!-- --><span class="es-button-border es-button-border-7997 msohide" style="background:#0891b2;border-width:0"><a class="es-button es-button-5697" target="_blank" href="${process.env.NEXTAUTH_URL}/accept-invite?token=${inviteToken}" style="background:#0891b2;mso-border-alt:10px solid #0891b2;color:#ffffff">Create Account</a></span> <!--<![endif]-->
                                                      </td>
                                                    </tr>
                                                </table>
                                              </td>
                                          </tr>
                                        </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="es-p30t es-p40r es-p40l" align="left">
                                        <table cellpadding="0" cellspacing="0" width="100%">
                                          <tr>
                                              <td width="560" align="center" valign="top">
                                                <table cellpadding="0" cellspacing="0" width="100%">
                                                    <tr>
                                                      <td align="center" style="display: none"></td>
                                                    </tr>
                                                </table>
                                              </td>
                                          </tr>
                                        </table>
                                    </td>
                                  </tr>
                              </table>
                            </td>
                        </tr>
                      </table>
                  </td>
                </tr>
            </table>
          </div>
      </body>
    </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Successfully invited ${email}`)
    return {status:"success",info:info};
    
  } catch (error) {
    console.error('Error sending email:', error);
    return {status:"failure",info:error};
  }
}

export { sendInviteEmail };