<template>
  <div class="login">
    <div class="toggle">
      <span class="flt" :class="{ active: isActive1 }" @click="left">短信验证码登录</span>
      <span class="flt" :class="{ active: isActive2 }" @click="right">账号密码登录</span>
    </div>
    <div class="content" v-if="status == 0">
      <div class="ipt1">
        <input type="number" v-model="mobile" placeholder="请输入手机号码" maxlength="16">
      </div>
      <div class="ipt2">
        <!-- <van-field
          v-model="mobile"
          placeholder="请输入手机号"
        />
        <van-cell-group>
          <van-field
            v-model="sms"
            placeholder="请输入短信验证码"
            icon="clear"
            @click-icon="sms = ''"
          >
          <van-button slot="button" size="small" >发送验证码</van-button>
          </van-field>
        </van-cell-group> -->
        <input type="number" v-model="smsCode" placeholder="请输入验证码" maxlength="10">
        
        <div class="code frt" @click="getcode" :disabled="disabled" :class="{ active: disabled }">{{btntxt}}</div>
      </div>
      
      <div class="btn">
        <button @click="loginSms">登录</button>
      </div>
      <div class="mid">
        <van-checkbox v-model="checked" label-disabled>同意&nbsp;<span class="contract" @click="agreement">磁云金融平台注册服务协议</span></van-checkbox>
      </div>
    </div>
    <div class="content" v-if="status == 1">
      <div class="ipt1">
        <input type="number" v-model="mobile" placeholder="请输入手机号码" maxlength="16">
      </div>
      <div class="ipt1">
        <input type="password" v-model="password" placeholder="请输入登录密码" maxlength="12">
      </div>
      <div class="forget frt" @click="toChangeLoginPwd">
        忘记密码？
      </div>
      <div class="btn">
        <button @click="loginPwd">登录</button>
      </div>
      <div class="btn2">
        <button @click="registNext">注册领取加息特权</button>
      </div>
      <div class="mid">
        <van-checkbox v-model="checked" label-disabled>同意&nbsp;<span class="contract" @click="agreement">磁云金融平台注册服务协议</span></van-checkbox>
      </div>
    </div>
      <van-dialog v-model="show" :close-on-click-overlay="true" :show-confirm-button="false">
        <div class="agContent">
            <h3 align="center" style="font-weight:bold;"> 网站注册使用协议</h3>
            <h4 align="center" style="font-weight:bold;">前言</h4>
            <p style="text-indent:28px;" > 本网站（网址:【https://boot.paituodai.com】）由深圳市三田雍泓互联网金融服务有限公司（下称“磁云金融”或“我方”）所有和负责运营。本网站注册使用协议（“本协议”）的双方为磁云金融与本网站注册用户（下称“用户”或“您”），本协议在磁云金融与您之间具有法律效力，适用于您在本网站的全部活动。</p>
            <p style="text-indent:28px;font-weight:bold;" >请您在注册成为本网站用户前务必仔细阅读本协议，尤其是加粗条款，若您不同意本协议的任何内容，或者无法准确理解磁云金融对条款的解释，请不要进行后续操作；若您注册成为本网站用户，则表示您对本协议的全部内容已充分阅读并认可和同意遵守。本协议已对与您的权益具有或可能具有重大关系的条款，及对磁云金融具有或可能具有免责或限制责任的条款用粗体字予以标注，请您注意。</p>
            <p style="text-indent:28px;" >同时，若您注册成为本网站用户，则表示您承诺遵守与本协议相关的中国法律、法规、规章及其他政府规范性文件规定，如有违反而造成任何法律后果，您将自行独立承担所有相应的法律责任。</p>
            <p style="text-indent:28px;" >本协议内容包括以下条款及本网站已经发布的或将来可能发布的各类规则。本网站发布的所有规则为本协议不可分割的一部分，与协议正文具有同等法律效力。
                磁云金融有权根据需要不定时地制定、修改本协议或各类规则（“更新的协议”），本网站将随时刊载并公告本协议及规则变更情况。除非是出于法律或行政原因的变更，否则我们会在更新的协议生效之前适时给出合理的提前通知。您同意，我们可以通过在我方网站上公布更新的协议来向您告知更新事宜，并且您在更新的协议生效之后继续使用本网站提供的各项服务（或者采取我们可能合理认定您已接受更新的协议的其他类似行为），则表明您已充分阅读并认可和同意遵守更新的协议。若您拒绝接受更新的协议，您有权放弃或终止继续使用本网站提供的各项服务，但您应承担在本网站已经进行的交易下所应承担的任何法律责任，且应遵循在您发生交易时有效的协议或规则内容。因此，在使用我方提供的各项服务之前，您应当审查本协议和更新的协议。更新的协议自公布之日或协议中指定的其他日期开始生效，并从生效之日起对您使用我方服务的行为产生约束力。本协议适用于在下一版更新的协议生效之前产生的任何争议。
            </p>
            <h4 align="center" style="font-weight:bold;">一、注册规则</h4>
            <h5 style="font-weight:bold;">1、注册与用户定义 </h5>
            <p style="text-indent:28px;" >用户注册是指欲申请成为本网站用户的人员登录，并按要求填写相关信息并确认同意履行相关用户协议的过程。个人用户是指通过本网站完成全部注册程序后，使用本网站服务，并且符合中华人民共和国法律规定的具有完全民事行为能力，能够独立承担民事责任的自然人。机构用户是指通过本网站完成全部注册程序后，使用本网站服务，并且依据中华人民共和国法律在中华人民共和国境内（香港、台湾、澳门除外）设立的，具有民事行为能力，能够独立承担民事责任的法人或其他组织。若用户违反前述限制注册使用磁云金融提供的服务的，其监护人应承担所有责任。</p>
            <h5 style="font-weight:bold;">2、注册资料要求</h5>
            <p style="text-indent:28px;" >申请成为本网站用户，首先需要完成注册。在注册时，您将选择用户名和密码，用户名的选择应遵守法律法规及社会公德。</p>
            <p style="text-indent:28px;" >同时，您必须按照申请注册用户的表格填写您的资料，并遵守如下要求：</p>
            <p style="text-indent:28px;" >（1）您必须提供真实、最新、有效及完整的资料，并且授予磁云金融基于提供网站服务的目的，对您提供的资料及数据信息拥有全球通用的、永久的、免费的使用权利。</p>
            <p style="text-indent:28px;" >（2）您有义务维持并更新注册的用户资料，确保其为真实、最新、有效及完整的资料。如因您未及时更新基本资料，导致磁云金融服务无法提供或提供时发生任何错误，您不得将此作为取消交易或拒绝付款的理由，磁云金融亦不承担任何责任，所有后果应由您承担。</p>
            <p style="text-indent:28px;" >（3）若您提供任何错误、虚假、过时或不完整的资料，或者磁云金融依其独立判断怀疑资料为错误、虚假、过时或不完整的，磁云金融有权暂停或终止您在本网站的注册账号，并拒绝您使用本网站服务的部分或全部功能。在此情况下，磁云金融不承担任何责任，您同意承担因此所产生的直接或间接的任何支出或损失。</p>
            <p style="text-indent:28px;" >（4）您有义务提供有效的联系方式，包括但不限于手机号码、电话号码、通讯地址、常用电子邮箱、联系人信息等。联系方式发生变更时，您应在3日内进行更新。因您未提供有效联系方式，导致磁云金融未能提供相应服务或给其他用户造成损失的，应由您自行承担全部损失和不利法律后果。</p>
            <h5 style="font-weight:bold;">3、用户名及登录密码的使用</h5>
            <p style="text-indent:28px;" >您拥有在本网站的用户名及登录密码，并有权使用自己的用户名及密码随时登录本网站，您不得以任何形式擅自转让或授权他人使用自己的用户名及密码。磁云金融通过用户的注册用户名及密码来识别用户的指令。用户确认，使用用户名和密码登录后在本网站的一切行为均代表用户本人。用户注册操作所产生的电子信息记录均为用户行为的有效凭证，并由用户本人承担由此产生的全部责任。除了那些有明确授权可代表其雇主或客户创建账户的个人或企业以外，磁云金融禁止为他人创建账户，并且您同意不会为他人创建账户。</p>
            <p style="text-indent:28px;" >我们特别提醒您应当妥善保管您的注册用户名和密码。当您使用完毕后，应安全退出。因您保管不善可能导致遭受盗号或密码失窃，责任应由您自行承担。</p>
            <h4 align="center" style="font-weight:bold;">二、用户的义务</h4>
            <h5 style="font-weight:bold;">1、保证资金来源合法</h5>
            <p style="text-indent:28px;" >用户保证并承诺通过本网站进行交易的资金来源合法。</p>
            <h5 style="font-weight:bold;">2、信息发布真实有效</h5>
            <p style="text-indent:28px;" >用户承诺，其通过本网站发布的信息均真实有效，其向磁云金融提交的任何资料均真实、有效、完整、准确。如因违背上述承诺，造成磁云金融或本网站其他用户损失的，用户将承担相应责任。</p>
            <h5 style="font-weight:bold;">3、禁止对网站数据进行商业性利用</h5>
            <p style="text-indent:28px;" >用户承诺，不对本网站上的任何数据作商业性利用，包括但不限于在未经磁云金融事先书面同意的情况下，以复制、传播等任何方式使用本站上展示的资料。</p>

            <h5 style="font-weight:bold;">4、遵守法律法规</h5>
            <p style="text-indent:28px;font-weight:bold;" >用户在接受磁云金融服务时必须遵守中国法律、法规、规章以及政府规范性文件，不得做出违法违规的行为，具体如下：</p>
            <p style="text-indent:28px;" >（1）不得发表、传送、传播、储存侵害他人知识产权、商业秘密等合法权利的内容。</p>
            <p style="text-indent:28px;" >（2）不得制造虚假身份、发布虚假信息等误导性、欺骗性内容，或违背磁云金融页面公布之活动规则进行虚假交易。</p>
            <p style="text-indent:28px;" >（3）不得进行危害计算机网络安全的行为。包括但不限于在您所发布的信息中含有蓄意毁坏、恶意干扰、秘密地截取或侵占任何系统、数据或个人资料的任何病毒、伪装破坏程序、电脑蠕虫、定时程序炸弹或其他电脑程序。</p>
            <p style="text-indent:28px;" >（4）不得发布、传送、传播、储存危害国家安全统一、破坏社会稳定、违反公序良俗、侮辱、诽谤、淫秽、暴力等违反国家法律法规的信息，不得发布其它涉嫌违法或违反本协议及各类规则的信息。</p>
            <p style="text-indent:28px;" >（5）禁止更改、修改、改编或改变我方产品或服务，或者更改、修改或改变其他网站以达到让人误以为该网站与我方产品或服务关联的目的。</p>
            <p style="text-indent:28px;" >（6）其他法律法规明确禁止的行为。</p>
            <h4 align="center" style="font-weight:bold;">三、通知及送达</h4>
            <h5 style="font-weight:bold;">1、通知方式</h5>
            <p style="text-indent:28px;" >本协议条款及任何其他的协议、告示或其他关于您使用本服务账号及服务的通知，您同意本网站使用电子方式或通过向您在注册时预留的通讯地址邮寄文件资料的方式通知您。电子方式包括但不限于以电子邮件方式、或向您的磁云金融平台账户发送信息、或于本网站或者合作网站上公布、或无线通讯装置通知等方式。</p>
            <h5 style="font-weight:bold;">2、送达</h5>
            <p style="text-indent:28px;" >网站的通知如以公示方式做出，一经在本网站公示即视为已经送达。除此之外，其他向您个人发布的具有专属性的通知将由本网站向您的磁云金融平台账户发送，或通过您注册时或者注册后变更用户信息时向本网站提供的电子邮箱、通讯地址或用户注册后在本网站绑定的手机号码发送，一经发送即视为已经送达。请您密切关注您的账户信息、电子邮箱、注意接收邮寄至通讯地址的邮件以及手机中的短信信息。因信息传输等原因导致您未在前述通知发出当日收到该等通知的，本网站不承担责任。</p>
            <h5 style="font-weight:bold;">3、通知内容</h5>
            <p style="text-indent:28px;" >您同意磁云金融利用在本网站登记的联系方式与您联络并向您传递相关的信息，包括但不限于我方行政管理方面的通知、产品信息、合同履行过程中的通知、债权转让通知、有关您使用本网站的通讯以及针对性的广告条等。</p>
            <h4 align="center" style="font-weight:bold;">四、服务提供与服务费用</h4>
            <h5 style="font-weight:bold;">1、服务内容</h5>
            <p style="text-indent:28px;font-weight:bold;" >本网站服务内容主要包括发布借款需求、查阅交易机会、签订和查阅合同、资金充值、提现等，具体详情以磁云金融当时公布的服务内容和范围为准。用户遵循借贷自愿、诚实守信、责任自负、风险自担的原则承担借贷风险；磁云金融不提供增信服务，不承担借贷违约风险。</p>
            <h5 style="font-weight:bold;">2、服务费用</h5>
            <p style="text-indent:28px;" >当用户使用本网站服务时，磁云金融将向用户收取相应服务费用。各项服务具体费用标准请详见网站上公布的业务定价及有关规则。用户承诺按照磁云金融公布的服务费用标准向磁云金融支付服务费用。用户通过本网站与其他方签订协议的，用户按照签署的协议约定向其他方支付费用。</p>
            <p style="text-indent:28px;" >磁云金融保留单方面制定与调整服务费用的权利。费用标准一旦被修改，即公布在本网站上，修改后的费用标准一经公布即行生效，适用于费用标准修改后发生的交易。</p>
            <p style="text-indent:28px; font-weight:bold;" >请注意：磁云金融在避免用户损失或给予用户补偿的前提下，有权单方决定暂时或永久地改变或停止提供某些服务。</p>
            <h4 align="center" style="font-weight:bold;">五、隐私条款</h4>
            <h5 style="font-weight:bold;">1、账号及信息的安全</h5>
            <p style="text-indent:28px;" >磁云金融将竭尽所能保护所有用户信息安全，不会向任何无关第三方提供、出售、分享注册用户的个人账号及信息。用户应保管好用户名与密码，不得向其他任何人泄露用户的用户名和密码，亦不可使用其他任何人的用户名和密码。因黑客、病毒或用户的保管疏忽等非磁云金融原因导致账号遭他人非法使用的，磁云金融不承担任何责任。</p>
            <p style="text-indent:28px;" >冒用他人账号的，磁云金融及其合法授权主体保留追究冒用人责任的权利。</p>
            <p style="text-indent:28px;" >磁云金融将严格采取相应技术措施保护用户的账号安全，包括但不限于对用户密码加密的方式。同时，磁云金融将运用相关安全技术确保其掌握的信息不丢失、不被滥用和变造。但请注意，尽管磁云金融将竭尽全力保护用户的账号及信息安全，但在互联网情况下不存在绝对安全的保障措施。</p>
            <h5 style="font-weight:bold;">2、信息资料的来源</h5>
            <p style="text-indent: 28px;;" >（1）磁云金融收集用户的任何资料旨在保障用户顺利、有效、安全地进行交易等行为。</p>
            <p style="text-indent:28px;font-weight:bold; " >（2）除用户向磁云金融自愿提供的资料外，用户同意并授权磁云金融以下列方式收集并核对用户的信息：</p>
            <p style="text-indent:56px;" >（a）通过公开及私人资料来源收集用户的额外资料。</p>
            <p style="text-indent:56px;" >（b）磁云金融根据用户在本网站上的行为自动追踪关于用户的相关资料。磁云金融将合理利用该相关资料进行本网站用户的人数统计及行为的内部研究，以更好地了解您以及本网站的其他用户，从而提供更好、更完善的服务。</p>
            <p style="text-indent:56px;" >（c）若其他用户或第三方向磁云金融发出关于用户在本网站上活动或登录事项的信息，磁云金融可以将这些资料收集、整理在用户的专门档案中。</p>
            <h5 style="font-weight:bold;">3、信息披露和使用</h5>
            <p style="text-indent:28px;font-weight:bold;" >用户在此同意并授权磁云金融在如下情况发生时披露或使用用户的个人信息，而无需额外取得用户的同意或授权：</p>
            <p style="text-indent:28px;" >（1）用户同意磁云金融利用用户的联系方式与用户联络并向用户传递与用户相关的信息，包括但不限于我方行政管理方面的通知、产品提供、有关用户使用磁云金融的服务、通讯以及针对性的广告条；</p>
            <p style="text-indent:28px;" >（2）为了分析本网站的使用率、改善本网站的内容和产品推广形式，并使本网站的内容、设计和服务更能符合用户的要求，用户同意磁云金融使用用户的个人信息。磁云金融对个人信息的合理使用能使用户在使用本网站服务时得到更为顺利、有效、安全的体验；</p>
            <p style="text-indent:28px;" >（3）磁云金融有义务根据有关法律要求向司法机关和政府部门提供用户的个人信息；</p>
            <p style="text-indent:28px;" >（4）为了保护用户的合法权益或为防止严重侵害他人合法权益或为了公共利益的需要，磁云金融将善意地披露用户的个人信息；</p>
            <p style="text-indent:28px;" >（5）经国家生效法律文书或行政处罚决定确认用户存在违法行为，或者磁云金融有足够事实依据可以认定用户存在违法或违反本注册协议的行为或者借款逾期未还的，用户同意并授权磁云金融在本网站及互联网络上公布您的违法、违约行为，并将该内容记入任何与您相关的信用资料和档案；</p>
            <p style="text-indent:28px;" >（6）为完成磁云金融及本网站对用户提供的服务或基于其他服务用户之目的，在磁云金融的关联方、合作方同意承担保密义务的前提下，磁云金融有权向其关联方、合作方提供用户的个人资料和信息；</p>
            <p style="text-indent:28px;" >（7）用户无权要求磁云金融提供其他用户的个人信息，除非司法机关或政府部门根据法律法规要求磁云金融提供。</p>
            <h5 style="font-weight:bold;">4、保密义务</h5>
            <p style="text-indent:28px;" >磁云金融及本网站所有用户应当履行保密义务。对在文件签署过程中所获取的对方的商业秘密以及相关权益（包括但不限于客户资料、策划方案、产品知识产权、协议合同、技术文档、账号密码），非经相关权利人许可，不得向第三方披露。关于被授权使用的有关资料、商业秘密等信息，只能在授权指定的范围使用，不得用于其他目的。</p>
            <h4 align="center" style="font-weight:bold;">六、涉及第三方网站或内容</h4>
            <p style="text-indent:28px;" >1、本网站服务或内容可能涉及由第三方所有、控制或运营的其它网站（以下称“第三方网站”），含有访问第三方网站的链接；同时，磁云金融将会在任何需要的时候增加商业伙伴或共用品牌的网站。本网站的服务或内容还包含我们未予控制、维护或支持的第三方内容。</p>
            <p style="text-indent:28px;" >2、磁云金融对任何此类第三方网站服务或其内容不予控制。您明确理解并同意，磁云金融对所有第三方网站的隐私保护措施不负任何责任。</p>
            <p style="text-indent:28px;" >3、磁云金融不保证第三方网站上信息的真实性和有效性。您应按照第三方网站的相关协议与规则使用第三方网站，而不是按照本协议。第三方网站的内容、产品、广告和其他任何信息均由您自行判断并承担风险，而与磁云金融无关。</p>
            <h4 align="center" style="font-weight:bold;">七、知识产权</h4>
            <h5 style="font-weight:bold;">1、知识产权之内容</h5>
            <p>&nbsp;&nbsp;nbsp;&nbsp;无论是否明示，磁云金融对本网站内所有非公有领域或非他方专有的信息内容享有知识产权（包括但不限于商标权、专利权、著作权、商业秘密等），信息内容包括但不限于文字、图片、软件、音频、视频、数据、源代码、设计、专有技术等。</p>
            <h5 style="font-weight:bold;">2、侵犯之禁止</h5>
            <p style="text-indent:28px;" >非经磁云金融授权同意及法律规定，任何其他组织或个人都不得使用属于磁云金融的信息内容。本网站所有的产品、技术及程序等信息内容均由磁云金融享有知识产权或被授权使用；未经磁云金融授权许可，任何其他组织或个人不得擅自使用（包括但不限于以非法的方式打印、复制、传播、展示、下载等）。否则，磁云金融将依法追究其法律责任。</p>
            <h4 align="center" style="font-weight:bold;">八、违约责任</h4>
            <p style="text-indent:28px;" >1、当用户的行为涉嫌违反法律法规或违反本协议和/或规则的，磁云金融有权采取相应措施，包括但不限于直接屏蔽、删除侵权信息，或直接停止提供服务。如使磁云金融遭受任何损失的（包括但不限于受到第三方的索赔、受到行政管理部门的处罚等），用户还应当赔偿或补偿磁云金融遭受的损失及（或）发生的费用，包括诉讼费、律师费、保全费等。</p>
            <p style="text-indent:28px;" >2、由于违反本协议，或违反其在本网站上签订的协议或文件，或由于用户使用本网站服务违反了任何法律或侵害第三方权利而导致任何第三方向磁云金融提出任何补偿或赔偿申请或要求（包括律师费用），用户应对磁云金融给予全额补偿或赔偿并使之不受损害。</p>
            <p style="text-indent:28px;" >3、如因磁云金融违反有关法律、法规或本协议项下的任何条款而给用户造成损失，磁云金融同意承担由此造成的损害赔偿责任。</p>
            <h4 align="center" style="font-weight:bold;">九、免责声明</h4>
            <h5 style="font-weight:bold;">1、风险免责</h5>
            <p style="text-indent:28px;font-weight:bold;" >（1）用户知晓并同意，任何通过本网站进行的交易并不能避免以下风险的产生，磁云金融不能也没有义务为如下风险负责：</p>
            <p style="text-indent:28px;" >（a）宏观经济风险：因宏观经济形势变化，可能引起价格等方面的异常波动，用户有可能遭受损失。</p>
            <p style="text-indent:28px;" >（b）政策风险：有关法律、法规及相关政策、规则发生变化，可能引起价格等方面异常波动，用户有可能遭受损失。</p>
            <p style="text-indent:28px;" >（c）违约风险：因其他交易方无力或无意愿按时足额履约，用户有可能遭受损失。</p>
            <p style="text-indent:28px;" >（d）利率风险：市场利率变化可能对投资或持有产品的实际收益产生影响。</p>
            <p style="text-indent:28px; font-weight:bold;"  >（2）磁云金融不对任何用户及/或任何交易提供任何明示或默示的担保。磁云金融及其工作人员向用户提供的各种信息及资料仅为参考，用户应依其独立判断做出决策。用户据此进行交易的，产生的风险由用户自行承担，用户无权据此向磁云金融提出任何法律主张。在交易过程中，交易各方发生的纠纷，由纠纷各方自行解决，磁云金融作为交易平台方不承担任何责任。</p>
            <p style="text-indent:28px;" >（3）以上并不能揭示用户通过磁云金融进行交易的全部风险及市场的全部情形。用户在做出交易决策前，应全面了解相关交易，谨慎决策，并自行承担全部风险。</p>
            <h5 style="font-weight:bold;">2、互联网自身不稳定性免责</h5>
            <p style="text-indent:28px;" >由于互联网本身所具有的不稳定性，磁云金融无法保证服务不会中断。系统因有关状况无法正常运作，使用户无法使用任何本网站服务或使用本网站服务受到任何影响时，磁云金融对用户或第三方不负任何责任，前述状况包括但不限于：</p>
            <p style="text-indent:28px;" >（1）本网站系统停机维护期间。</p>
            <p style="text-indent:28px;" >（2）电信设备出现故障不能进行数据传输的。</p>
            <p style="text-indent:28px;" >（3）由于黑客攻击、网络供应商技术调整或故障、网站升级、银行方面的问题等原因而造成的本网站服务中断或延迟。</p>
            <h5 style="font-weight:bold;">3、不可抗力免责</h5>
            <p style="text-indent:28px;" >对于因磁云金融合理控制范围以外的原因，包括但不限于自然灾害（台风、地震、海啸、洪水）、罢工或骚乱、物质短缺或定量配给、暴动、战争行为、政府行为或政策变化、通讯或其他设施故障或严重伤亡事故等，致使磁云金融延迟或未能履约的，磁云金融不对用户承担任何责任。</p>
            <h5 style="font-weight:bold;">4、用户自身过错免责</h5>
            <p style="text-indent:28px;" >因用户的过错导致的任何损失，该过错包括但不限于：决策失误、操作不当、遗忘或泄露密码、密码被他人破解、用户使用的计算机系统被第三方侵入、用户委托他人代理交易时他人恶意或不当操作而造成的损失。</p>
            <h4 align="center" style="font-weight:bold;">十、争议解决适用法律及管辖</h4>
            <p style="text-indent:28px;font-weight:bold;" >1、本协议的订立、变更、执行和解释，以及与本协议有关的争议解决，均应适用中华人民共和国法律（为本协议之目的，不含香港特别行政区、澳门特别行政区及台湾地区）。如与本协议有关的某一特定事项没有法律规定或规定不明确，则应参照通用的商业惯例和行业惯例。</p>
            <p style="text-indent:28px;font-weight:bold;" >2、双方应尽快协商解决因本协议或因磁云金融服务所引起或与其有关的任何争议。如协商不成的，双方一致同意向磁云金融所在地的人民法院起诉。</p>
            <p style="text-indent:28px;" >3、用户同意法院在诉讼过程中使用电子邮件向用户注册时预留的电子邮箱送达诉讼文书。</p>
            <h4 align="center" style="font-weight:bold;">十一、其他</h4>
            <p style="text-indent:28px;" >1、本协议自用户同意勾选或网上签署并成功注册成为本网站用户之日起生效，除非磁云金融终止本协议、用户注销本网站的账户并停止使用本网站的服务或者用户丧失本网站用户资格，否则本协议始终有效。本协议终止并不免除用户根据本协议或其他有关协议、规则所应承担的义务和责任。</p>
            <p style="text-indent:28px;" >2、本协议部分条款被认定为无效时，不影响本协议其他条款的效力。</p>
            <p style="text-indent:28px;" >3、本协议版本于 2017年 12 月1日发布。</p>
            <p style="text-indent:28px;" >4、磁云金融有权在任何时候自行决定限制我方产品或服务或其任意部分对任何个人、地域的可用性，以及限制公司提供的内容、程序、产品、服务或其他功能的数量。</p>
            <p style="text-indent:28px;" >5、磁云金融对本协议享有最终的解释权。</p>
        </div>
      </van-dialog>
  </div>
</template>

<script>
import storage from "store2";
const setStorage = data => {
  storage.set("sid", data.sid);
  storage.set("userId", data.userId);
  storage.set("userType", data.userType);
  storage.set("userKey", data.userKey);
};
export default {
  name: "login",
  components: {},
  props: [],
  data() {
    return {
      mobile: "",
      smsCode: "",
      password: "",
      status: 0,
      isActive1: true,
      isActive2: false,
      disabled: false, //禁用验证码
      time: 0,
      btntxt: "获取验证码",
      checked: false, //同意
      show: false
    };
  },
  created() {},
  mounted() {
    // console.log(this.$route.query.redirect);
  },
  methods: {
    getcode() {
      let isPhone = this.$util.isPhone(this.mobile);
      let data = {
        mobile: this.mobile,
        smsType: "USER_REGIST_CODE"
      };
      if (this.mobile == "") {
        this.$toast("请先输入手机号");
      } else if (!isPhone) {
        this.$toast("请输入正确的手机号");
      } else {
        this.axios.post("/sms/sendSms", data).then(res => {
          if (res.success) {
            this.time = 60;
            this.timer();
            this.$toast(res.message);
          } else {
            this.$toast(res.message);
          }
        });
      }
    },
    left() {
      this.status = 0;
      this.isActive1 = true;
      this.isActive2 = false;
    },
    right() {
      this.status = 1;
      this.isActive1 = false;
      this.isActive2 = true;
    },
    agreement() {
      this.show = true;
    },
    timer() {
      if (this.time > 0) {
        this.disabled = true;
        this.time--;
        this.btntxt = this.time + "s";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    },
    //注册跳转
    registNext() {
      if (this.checked == false) {
        this.$toast("请先阅读并同意相关协议");
      } else {
        this.$router.push("/registerstep1");
      }
    },
    //注册
    register(data) {
      return new Promise(resolve => {
        this.axios.post("regist/submit", data).then(res => {
          resolve(res);
        });
      });
    },
    //短信登录
    login(data) {
      return new Promise(resolve => {
        this.axios.post("login_duanxin", data).then(res => {
          resolve(res);
        });
      });
    },
    //短信登录按钮
    loginSms() {
      let isPhone = this.$util.isPhone(this.mobile);
      let password = this.$util.encryptByDES(`icy${this.mobile}`);
      let registerData = {
        type: "GENERAL",
        mobile: this.mobile,
        password: password,
        clientType: "MOBILEWEB",
        smsCode: this.smsCode
      };
      let loginData = {
        type: "GENERAL",
        loginName: this.mobile,
        smsType: "USER_REGIST_CODE",
        smsCode: this.smsCode,
        clientType: "MOBILEWEB"
      };
      if (this.mobile == "") {
        this.$toast("请先输入手机号");
      } else if (!isPhone) {
        this.$toast("请输入正确的手机号");
      } else if (this.smsCode == "") {
        this.$toast("请先输入验证码");
      } else if (this.checked == false) {
        this.$toast("请先阅读并同意相关协议");
      } else {
        //判断是否已经注册
        this.axios
          .post(`regist/checkMobile?mobile=${this.mobile}&type=${"GENERAL"}`)
          .then(res => {
            if (res.success) {
              //如果未注册 先走注册接口在走登录接口
              this.register(registerData).then(res => {
                if (res.success) {
                  //注册成功
                  this.login(loginData).then(res => {
                    if (res.success) {
                      setStorage(res.data); //将sid等信息存起来
                      this.$toast(res.message);
                      if (!!this.$route.query.redirect) {
                        this.$router.push(this.$route.query.redirect);
                      } else {
                        this.$router.push("/home");
                      }
                    } else {
                      this.$toast(res.message);
                    }
                  });
                } else {
                  this.$toast(res.message); //注册失败
                }
              });
            } else {
              //如果已注册 直接走登陆接口
              this.login(loginData)
                .then(res => {
                  if (res.success) {
                    //登陆成功
                    setStorage(res.data); //将sid等信息存起来
                    this.$toast(res.message);
                    if (!!this.$route.query.redirect) {
                      this.$router.push(this.$route.query.redirect);
                    } else {
                      this.$router.push("/home");
                    }
                  } else {
                    this.$toast(res.message); //登录失败
                  }
                })
                .catch(err => {});
            }
          })
          .catch(err => {});
      }
    },
    //密码登录按钮
    loginPwd() {
      let isPhone = this.$util.isPhone(this.mobile);
      let password = this.$util.encryptByDES(this.password);
      let loginData = {
        loginName: this.mobile,
        type: "GENERAL", //个人
        password: password,
        clientType: "MOBILEWEB"
      };
      if (this.mobile == "") {
        this.$toast("请输入手机号");
      } else if (!isPhone) {
        this.$toast("请输入正确的手机号");
      } else if (this.password == "") {
        this.$toast("请输入密码");
      } else if (this.checked == false) {
        this.$toast("请先阅读并同意相关协议");
      } else {
        this.axios.post("login", loginData).then(res => {
          if (res.success) {
            setStorage(res.data); //将sid等信息存起来
            this.$toast(res.message);
            if (!!this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect);
            } else {
              this.$router.push("/home");
            }
          } else {
            this.$toast(res.message);
          }
        });
      }
    },
    toChangeLoginPwd() {
      this.$router.push({
        name: "changepwd1",
        query: { smsType: "USER_FIND_PASSWORD_CODE" }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  .agContent {
    height: 500px;
    overflow: scroll;
    font-size: 14px;
    color: #999;
    padding: 15px 20px;
  }
  .code {
    width: 30%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 15px;
    text-decoration: none;
    outline-style: none;
    color: #ff9800;
    border: 1px solid #ff9800;
    border-radius: 5px;
    background-color: #fff;
  }
  .code.active {
    width: 30%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 15px;
    text-decoration: none;
    outline-style: none;
    color: #ccc;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
  }
  .btn {
    width: 100%;
    margin-top: 33px;
    button {
      width: 100%;
      color: #fff;
      background-color: #ff9800;
      font-size: 18px;
      line-height: 46px;
      border-style: none;
      border-radius: 5px;
    }
  }
  .toggle {
    height: 44px;
    padding: 20px 23px 0px 23px;
    .flt {
      width: 50%;
      height: 43px;
      background-color: #fff;
      color: #ff9800;
      font-size: 16px;
      line-height: 44px;
      text-align: center;
      border: 1px solid #ff9800;
      box-sizing: border-box;
    }
    .flt.active,
    .frt.active {
      color: #fff;
      background-color: #ff9800;
    }
  }
  .content {
    padding: 0 23px 23px 23px;
    background-color: #fff;
    .ipt1,
    .ipt2 {
      width: 100%;
      height: 50px;
      margin-top: 10px;
      border-bottom: 1px solid #ccc;
      input {
        width: 100%;
        height: 100%;
        font-size: 16px;
        text-indent: 4px;
      }
    }
    .ipt2 {
      margin-bottom: 10px;
      input {
        width: 65%;
      }
    }
    .mid {
      width: 100%;
      height: 38px;
      font-size: 14px;
      line-height: 38px;
      color: #999999;
      .contract {
        color: #3f51b5;
      }
    }
    .forget {
      height: 27px;
      font-size: 14px;
      line-height: 30px;
      color: #3f51b5;
    }
    .btn2 {
      display: block;
      width: 100%;
      height: 46px;
      margin-top: 16px;
      button {
        width: 100%;
        color: #3f51b5;
        background-color: #fff;
        font-size: 18px;
        line-height: 46px;
        border-style: none;
        border-radius: 5px;
        border: 1px solid #3f51b5;
      }
    }
  }
}
</style>