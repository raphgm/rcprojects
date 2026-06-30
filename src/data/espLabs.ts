import { LabContent } from '../types/content';

export const espLabs: LabContent[] = [
  // LEVEL 1: ESP Foundations
  {
    projectId: 'esp-intro',
    environment: 'linux',
    description: 'Learn the threat landscape, identify threat types, and discover risk reduction behaviors.',
    objective: 'Complete the foundational security awareness simulations.',
    missionNumber: 1, totalMissions: 5, xpReward: 150,
    steps: [
      { id: '1', title: 'Identify Phishing Vector', instruction: 'Switch to "Email Inbox" tab. Select "ceo_giftcard" and click "Report as Phishing / Threat".', summary: 'Flag phishing mail.', whyNeeded: 'Urgent requests from external emails are high-risk.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_inbox', expectedOutput: 'true' },
      { id: '2', title: 'Lock Desktop Terminal', instruction: 'Switch to "Clean Desk" tab. Click "Press Win+L to Lock" under laptop screen card and verify desk security.', summary: 'Lock active monitor.', whyNeeded: 'Unlocked screens are vulnerable to shoulder surfing.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk', expectedOutput: 'true' },
      { id: '3', title: 'Flag Suspicious Link', instruction: 'Switch to "URL Inspector" tab. Enter "microsoft-security-auth.net" and click "Flag Threat".', summary: 'Flag spoof domain.', whyNeeded: 'Attackers spoof corporate portals to harvest logins.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_url', expectedOutput: 'true' },
      { id: '4', title: 'Configure Authenticator Code', instruction: 'Switch to "MFA Portal" tab. Input token "124056" and click "Enroll MFA".', summary: 'Enable accounts MFA.', whyNeeded: 'MFA blocks unauthorized login attempts.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_mfa', expectedOutput: 'true' },
      { id: '5', title: 'Verify General Audit', instruction: 'Ensure sticky notes are cleared and screen is locked under "Clean Desk" tab, then click Verify.', summary: 'Complete general desk audit.', whyNeeded: 'A clean desk keeps credentials private.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk_all', expectedOutput: 'true' }
    ]
  },
  {
    projectId: 'esp-passwords',
    environment: 'linux',
    description: 'Learn credential hijacking prevention, secure passwords, and configure Multi-Factor Authentication (MFA).',
    objective: 'Deploy enterprise account protection protocols.',
    missionNumber: 1, totalMissions: 5, xpReward: 150,
    steps: [
      { id: '1', title: 'Initiate MFA Portal Setup', instruction: 'Switch to "MFA Portal" tab. Input token "124056" and click "Enroll MFA".', summary: 'Enroll token.', whyNeeded: 'MFA adds critical auth layers.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_mfa', expectedOutput: 'true' },
      { id: '2', title: 'Clear Stored Passwords', instruction: 'Switch to "Clean Desk" tab. Remove yellow sticky notes under passwords card and verify.', summary: 'Clear sticky passwords.', whyNeeded: 'Storing passwords on paper compromises MFA.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk', expectedOutput: 'true' },
      { id: '3', title: 'Audit Lookalike Domain spoofing', instruction: 'Switch to "URL Inspector" tab. Inspect and Flag "microsoft-security-auth.net".', summary: 'Detect lookalike login portals.', whyNeeded: 'Attackers create fake login portals to bypass credentials.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_url', expectedOutput: 'true' },
      { id: '4', title: 'Report Suspicious Accounts request', instruction: 'Switch to "Email Inbox" tab. Select "ceo_giftcard" and click Report as Phishing.', summary: 'Flag urgent gift card requests.', whyNeeded: 'Phishing attempts try to bypass account controls.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_inbox', expectedOutput: 'true' },
      { id: '5', title: 'Complete Credentials Audit', instruction: 'Ensure desktop screen is locked and sticky note cleared on "Clean Desk" tab, then click verify.', summary: 'Perform final audit checklist.', whyNeeded: 'A secure station protects credential vaults.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk_all', expectedOutput: 'true' }
    ]
  },
  {
    projectId: 'esp-phishing',
    environment: 'linux',
    description: 'Detect phishing email signatures: check spoofed headers, identify BEC gift card requests, and flag threats.',
    objective: 'Filter inbox threat targets.',
    missionNumber: 1, totalMissions: 5, xpReward: 200,
    steps: [
      { id: '1', title: 'Identify Spoofed Sender Email', instruction: 'Switch to "Email Inbox" tab. Select "ceo_giftcard" and click Report as Phishing.', summary: 'Report threat mail.', whyNeeded: 'Urgent requests from external gmail addresses must be reported.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_inbox', expectedOutput: 'true' },
      { id: '2', title: 'Analyze Fake Auth URL', instruction: 'Switch to "URL Inspector" tab. Enter "microsoft-security-auth.net" and click Flag Threat.', summary: 'Inspect redirect domain.', whyNeeded: 'Phishing links redirect to credential harvesters.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_url', expectedOutput: 'true' },
      { id: '3', title: 'Enroll Secondary MFA Profile', instruction: 'Switch to "MFA Portal" tab. Input "124056" and click Enroll MFA.', summary: 'Secure authentication key.', whyNeeded: 'Phishing defenses require multi-factor validations.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_mfa', expectedOutput: 'true' },
      { id: '4', title: 'Lock Workplace Terminal', instruction: 'Switch to "Clean Desk" tab. Secure laptop screen lock card and verify.', summary: 'Lock desk screen.', whyNeeded: 'Unlocked devices allow local session takeover.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk', expectedOutput: 'true' },
      { id: '5', title: 'Perform General Inbox Clean', instruction: 'Verify "ceo_giftcard" remains reported and no sticky notes are left exposed under "Clean Desk" tab.', summary: 'Final check verification.', whyNeeded: 'Consistently following security rules prevents phishing incidents.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk_all', expectedOutput: 'true' }
    ]
  },
  {
    projectId: 'esp-browsing',
    environment: 'linux',
    description: 'Inspect URL domains, detect lookalike spoof links, and avoid malware download downloads.',
    objective: 'Audit suspicious link requests.',
    missionNumber: 1, totalMissions: 5, xpReward: 150,
    steps: [
      { id: '1', title: 'Inspect Redirect URL Host', instruction: 'Switch to "URL Inspector" tab. Enter "microsoft-security-auth.net" and click Flag Threat.', summary: 'Flag malicious host.', whyNeeded: 'Domain lookalikes fool users during redirects.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_url', expectedOutput: 'true' },
      { id: '2', title: 'Flag External Request email', instruction: 'Switch to "Email Inbox" tab. Select "ceo_giftcard" and click Report as Phishing.', summary: 'Report threat email.', whyNeeded: 'Deceptive emails contain redirection links.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_inbox', expectedOutput: 'true' },
      { id: '3', title: 'Enroll Device MFA keys', instruction: 'Switch to "MFA Portal" tab. Input "124056" and click Enroll MFA.', summary: 'Configure mobile authenticator.', whyNeeded: 'Enforcing MFA protects browsers session hijack.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_mfa', expectedOutput: 'true' },
      { id: '4', title: 'Secure Browser workspace screen', instruction: 'Switch to "Clean Desk" tab. Lock active screen and verify.', summary: 'Lock laptop console.', whyNeeded: 'Leaving active browser sessions unlocked risks account hijacking.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk', expectedOutput: 'true' },
      { id: '5', title: 'Verify Workspace Audit', instruction: 'Verify all physical items are locked and sticky notes cleared under "Clean Desk" tab.', summary: 'Audit physical desk workspace.', whyNeeded: 'Clean desks minimize target exposure.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk_all', expectedOutput: 'true' }
    ]
  },
  {
    projectId: 'esp-privacy',
    environment: 'linux',
    description: 'Understand PII classifications, protect company assets, and secure customer info files.',
    objective: 'Secure private database records.',
    missionNumber: 1, totalMissions: 5, xpReward: 200,
    steps: [
      { id: '1', title: 'Secure Exposed Dashboard screen', instruction: 'Switch to "Clean Desk" tab. Click "Press Win+L to Lock" under screen card and verify.', summary: 'Lock monitor display.', whyNeeded: 'Leaving private customer dashboards exposed violates privacy laws.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk', expectedOutput: 'true' },
      { id: '2', title: 'Audit Spoofed Domain access', instruction: 'Switch to "URL Inspector" tab. Enter "microsoft-security-auth.net" and click Flag Threat.', summary: 'Inspect link domain.', whyNeeded: 'PII theft often starts with spoofed credentials portals.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_url', expectedOutput: 'true' },
      { id: '3', title: 'Report urgent info request mail', instruction: 'Switch to "Email Inbox" tab. Select "ceo_giftcard" and click Report as Phishing.', summary: 'Report urgent phishing mail.', whyNeeded: 'Urgent mail templates try to trick users into sharing privacy keys.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_inbox', expectedOutput: 'true' },
      { id: '4', title: 'Deploy Privacy Console MFA', instruction: 'Switch to "MFA Portal" tab. Input "124056" and click Enroll MFA.', summary: 'Set up MFA keys.', whyNeeded: 'Multi-factor access keeps database storage secure.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_mfa', expectedOutput: 'true' },
      { id: '5', title: 'Complete Privacy physical checklist', instruction: 'Verify sticky note removed and screen locked under "Clean Desk" tab, click verify.', summary: 'Perform workspace compliance verification.', whyNeeded: 'PII records must not be physically left on desks.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk_all', expectedOutput: 'true' }
    ]
  },
  {
    projectId: 'esp-physical',
    environment: 'linux',
    description: 'Clean Desk policy audit: secure passwords sticky notes, lock workstations, and lock doors.',
    objective: 'Enforce Clean Desk compliance standards.',
    missionNumber: 1, totalMissions: 5, xpReward: 150,
    steps: [
      { id: '1', title: 'Secure Sticky notes passwords', instruction: 'Switch to "Clean Desk" tab. Remove yellow sticky notes under password card, then click Verify.', summary: 'Remove physical passwords.', whyNeeded: 'Sticky notes with passwords are top security violations.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk', expectedOutput: 'true' },
      { id: '2', title: 'Lock Workplace active workstation', instruction: 'Click "Press Win+L to Lock" under screen lock card and click Verify.', summary: 'Lock monitor display screen.', whyNeeded: 'Station walk-aways require screen locks.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk_all', expectedOutput: 'true' },
      { id: '3', title: 'Audit Redirect URL Phishing host', instruction: 'Switch to "URL Inspector" tab. Verify and Flag "microsoft-security-auth.net".', summary: 'Identify spoofed hosts.', whyNeeded: 'Attackers harvest password keys using fake login sites.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_url', expectedOutput: 'true' },
      { id: '4', title: 'Configure Account Authenticator profile', instruction: 'Switch to "MFA Portal" tab. Input "124056" and click Enroll MFA.', summary: 'Configure MFA.', whyNeeded: 'Physical security is backed up by multi-factor accounts protections.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_mfa', expectedOutput: 'true' },
      { id: '5', title: 'Report CEO Impersonation request', instruction: 'Switch to "Email Inbox" tab. Select "ceo_giftcard" and click Report as Phishing.', summary: 'Report phishing emails.', whyNeeded: 'Urgent office requests must be verified.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_inbox', expectedOutput: 'true' }
    ]
  },
  {
    projectId: 'esp-remote',
    environment: 'linux',
    description: 'Working remotely: configure home Wi-Fi keys, use corporate VPN tunnels, and secure laptops.',
    objective: 'Configure secure remote workplace access.',
    missionNumber: 1, totalMissions: 5, xpReward: 200,
    steps: [
      { id: '1', title: 'Enforce remote Authenticator tunnel', instruction: 'Switch to "MFA Portal" tab. Input "124056" and click Enroll MFA.', summary: 'Set up remote MFA key.', whyNeeded: 'VPN links require secondary token authorization.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_mfa', expectedOutput: 'true' },
      { id: '2', title: 'Clear exposed local passwords', instruction: 'Switch to "Clean Desk" tab. Clear sticky notes passwords and verify.', summary: 'Secure home sticky notes.', whyNeeded: 'Home office visitors should not see passwords.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk', expectedOutput: 'true' },
      { id: '3', title: 'Report Fake VPN Login Portal', instruction: 'Switch to "URL Inspector" tab. Flag "microsoft-security-auth.net".', summary: 'Flag fake portal URL.', whyNeeded: 'Attackers create fake VPN portals to harvest logins.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_url', expectedOutput: 'true' },
      { id: '4', title: 'Flag Spoofed CEO Email urgency', instruction: 'Switch to "Email Inbox" tab. Select "ceo_giftcard" and click Report as Phishing.', summary: 'Flag threat email.', whyNeeded: 'Impersonating executives is common in remote schemes.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_inbox', expectedOutput: 'true' },
      { id: '5', title: 'Lock Remote Home screen console', instruction: 'Under "Clean Desk" tab, verify screen is locked and sticky note cleared, click verify.', summary: 'Verify remote workstation audit.', whyNeeded: 'Remote laptops must be locked when unattended.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk_all', expectedOutput: 'true' }
    ]
  },
  {
    projectId: 'esp-incident',
    environment: 'linux',
    description: 'How to report an incident: check suspicious activities, write alert logs, and contact security teams.',
    objective: 'Report active security incident indicators.',
    missionNumber: 1, totalMissions: 5, xpReward: 250,
    steps: [
      { id: '1', title: 'Report Attack Host Domain', instruction: 'Switch to "URL Inspector" tab. Enter "microsoft-security-auth.net" and click Flag Threat.', summary: 'Report threat host.', whyNeeded: 'Flagging domains alert SOC analysts.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_url', expectedOutput: 'true' },
      { id: '2', title: 'Report Active Phishing mail', instruction: 'Switch to "Email Inbox" tab. Select "ceo_giftcard" and click Report as Phishing.', summary: 'Flag urgent gift card request.', whyNeeded: 'Phishing reports start incident response triage.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_inbox', expectedOutput: 'true' },
      { id: '3', title: 'Audit Desk physical logs breach', instruction: 'Switch to "Clean Desk" tab. Remove yellow sticky notes and verify.', summary: 'Secure sticky notes.', whyNeeded: 'Incident containment includes clearing office papers.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk', expectedOutput: 'true' },
      { id: '4', title: 'Enroll incident response MFA key', instruction: 'Switch to "MFA Portal" tab. Input "124056" and click Enroll MFA.', summary: 'Confirm MFA connection.', whyNeeded: 'Secure authentication is required during incident reviews.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_mfa', expectedOutput: 'true' },
      { id: '5', title: 'Verify incident containment setup', instruction: 'Verify desktop locked and notes cleared on "Clean Desk" tab, then click verify.', summary: 'Verify containment audit.', whyNeeded: 'Locking all stations blocks active attacks.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk_all', expectedOutput: 'true' }
    ]
  },
  {
    projectId: 'esp-insider',
    environment: 'linux',
    description: 'Recognize insider threats, manage workspace compliance, and protect intellectual records.',
    objective: 'Verify employee clearance controls.',
    missionNumber: 1, totalMissions: 5, xpReward: 200,
    steps: [
      { id: '1', title: 'Clean Desk workspace items', instruction: 'Switch to "Clean Desk" tab. Clear sticky notes passwords and verify.', summary: 'Secure desk workspace.', whyNeeded: 'Exposed records invite internal breaches.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk', expectedOutput: 'true' },
      { id: '2', title: 'Lock unattended office terminal', instruction: 'Lock laptop screen under screen lock card and verify.', summary: 'Lock monitor display.', whyNeeded: 'Leaving consoles logged-in risks local unauthorized access.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk_all', expectedOutput: 'true' },
      { id: '3', title: 'Flag Suspicious Corporate redirects', instruction: 'Switch to "URL Inspector" tab. Inspect and Flag "microsoft-security-auth.net".', summary: 'Detect hijacked URLs.', whyNeeded: 'Insiders exploit credential harvesting domains.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_url', expectedOutput: 'true' },
      { id: '4', title: 'Configure Multi-Factor Authentication', instruction: 'Switch to "MFA Portal" tab. Input "124056" and click Enroll MFA.', summary: 'Enable MFA tokens.', whyNeeded: 'Enforcing MFA limits internal lateral movement.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_mfa', expectedOutput: 'true' },
      { id: '5', title: 'Report unauthorized CEO requests', instruction: 'Switch to "Email Inbox" tab. Select "ceo_giftcard" and click Report as Phishing.', summary: 'Report impersonations.', whyNeeded: 'Always verify unexpected external requests.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_inbox', expectedOutput: 'true' }
    ]
  },
  {
    projectId: 'esp-ai',
    environment: 'linux',
    description: 'AI security guidelines: prevent copying PII or source codes into public LLM prompt boxes.',
    objective: 'Audit prompt leakage points.',
    missionNumber: 1, totalMissions: 5, xpReward: 200,
    steps: [
      { id: '1', title: 'Detect AI Phishing template', instruction: 'Switch to "Email Inbox" tab. Select "ceo_giftcard" and click Report as Phishing.', summary: 'Flag threat mail.', whyNeeded: 'AI systems produce convincing spear-phishing.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_inbox', expectedOutput: 'true' },
      { id: '2', title: 'Flag Spoofed Portal domain', instruction: 'Switch to "URL Inspector" tab. Enter "microsoft-security-auth.net" and click Flag Threat.', summary: 'Verify site host URL.', whyNeeded: 'Fake portals harvest inputs submitted by users.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_url', expectedOutput: 'true' },
      { id: '3', title: 'Configure Account Authenticator profile', instruction: 'Switch to "MFA Portal" tab. Input "124056" and click Enroll MFA.', summary: 'Enable accounts MFA key.', whyNeeded: 'MFA provides robust secondary protection.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_mfa', expectedOutput: 'true' },
      { id: '4', title: 'Lock exposed workstation screen', instruction: 'Switch to "Clean Desk" tab. Lock active screen and verify.', summary: 'Lock laptop console screen.', whyNeeded: 'Unlocked devices leave active sessions vulnerable.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk', expectedOutput: 'true' },
      { id: '5', title: 'Audit Desk physical logs', instruction: 'Clear yellow sticky notes and lock screen under "Clean Desk" tab, click verify.', summary: 'Perform final physical workspace check.', whyNeeded: 'Clean workspaces prevent physical data theft.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk_all', expectedOutput: 'true' }
    ]
  },

  // CAPSTONE PROJECTS
  {
    projectId: 'esp-project-phishing',
    environment: 'linux',
    description: 'Capstone: Phishing Assessment. Flag advanced social engineering emails in a live workspace inbox simulation.',
    objective: 'Triage mailbox threat vectors.',
    missionNumber: 1, totalMissions: 5, xpReward: 400,
    steps: [
      { id: '1', title: 'Filter CEO Gift Card request', instruction: 'Switch to "Email Inbox" tab. Select "ceo_giftcard" and click Report as Phishing.', summary: 'Report threat mail.', whyNeeded: 'Urgent requests demand strict verification.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_inbox', expectedOutput: 'true' },
      { id: '2', title: 'Flag Spoofed Redirect Domain URL', instruction: 'Switch to "URL Inspector" tab. Enter "microsoft-security-auth.net" and click Flag Threat.', summary: 'Flag threat domain.', whyNeeded: 'Phishing links redirect to spoofed logins.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_url', expectedOutput: 'true' },
      { id: '3', title: 'Enroll Workplace profile MFA keys', instruction: 'Switch to "MFA Portal" tab. Input "124056" and click Enroll MFA.', summary: 'Enforce MFA validation.', whyNeeded: 'MFA keys protect logins.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_mfa', expectedOutput: 'true' },
      { id: '4', title: 'Lock unattended desk laptop screen', instruction: 'Switch to "Clean Desk" tab. Lock screen and click verify.', summary: 'Secure screen console.', whyNeeded: 'Unlocked screens risk local compromise.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk', expectedOutput: 'true' },
      { id: '5', title: 'Complete physical clean checklist', instruction: 'Clear sticky note and lock screen on "Clean Desk" tab, then click verify.', summary: 'Verify physical workspace audit.', whyNeeded: 'Enforcing physical guidelines blocks target exposure.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk_all', expectedOutput: 'true' }
    ]
  },
  {
    projectId: 'esp-project-mfa',
    environment: 'linux',
    description: 'Capstone: Password Guardian. Secure accounts, generate robust password hashes, and activate MFA tokens.',
    objective: 'Enforce Multi-Factor accounts protections.',
    missionNumber: 1, totalMissions: 5, xpReward: 400,
    steps: [
      { id: '1', title: 'Enroll accounts MFA Authenticator profile', instruction: 'Switch to "MFA Portal" tab. Input "124056" and click Enroll MFA.', summary: 'Verify MFA enroll.', whyNeeded: 'Secondary token validation stops credential replay attacks.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_mfa', expectedOutput: 'true' },
      { id: '2', title: 'Remove Exposed sticky passwords', instruction: 'Switch to "Clean Desk" tab. Clear yellow sticky note password card and verify.', summary: 'Secure physical password keys.', whyNeeded: 'Exposing credentials on paper defeats MFA locks.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk', expectedOutput: 'true' },
      { id: '3', title: 'Flag Spoofed Accounts redirect domain', instruction: 'Switch to "URL Inspector" tab. Enter "microsoft-security-auth.net" and click Flag Threat.', summary: 'Flag spoof URL.', whyNeeded: 'Hijacked domain names harvest passwords during login.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_url', expectedOutput: 'true' },
      { id: '4', title: 'Report Deceptive Accounts login alert', instruction: 'Switch to "Email Inbox" tab. Select "ceo_giftcard" and click Report as Phishing.', summary: 'Report threat mail.', whyNeeded: 'Reporting threat alerts protects corporate networks.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_inbox', expectedOutput: 'true' },
      { id: '5', title: 'Perform final physical desk checklist', instruction: 'Verify screen is locked and notes cleared on "Clean Desk" tab, click verify.', summary: 'Verify general desk audit.', whyNeeded: 'A clean workspace reduces insider targets.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk_all', expectedOutput: 'true' }
    ]
  },
  {
    projectId: 'esp-project-physical',
    environment: 'linux',
    description: 'Capstone: Office Security Audit. Inspect office rooms to flag and lock unlocked terminals or sticky notes passwords.',
    objective: 'Audit physical workspace assets.',
    missionNumber: 1, totalMissions: 5, xpReward: 400,
    steps: [
      { id: '1', title: 'Clear Sticky Note password exposure', instruction: 'Switch to "Clean Desk" tab. Remove yellow sticky notes and verify.', summary: 'Remove sticky note password.', whyNeeded: 'Sticky notes passwords are top targets for physical office bypass.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk', expectedOutput: 'true' },
      { id: '2', title: 'Lock unattended station monitor console', instruction: 'Lock laptop screen under screen card and verify.', summary: 'Lock monitor display.', whyNeeded: 'Station walk-aways require screen locks.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk_all', expectedOutput: 'true' },
      { id: '3', title: 'Report redirect links phishing domains', instruction: 'Switch to "URL Inspector" tab. Enter "microsoft-security-auth.net" and click Flag Threat.', summary: 'Verify host URL.', whyNeeded: 'Attackers host lookalike portals to hijack sessions.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_url', expectedOutput: 'true' },
      { id: '4', title: 'Enroll accounts profile MFA protections', instruction: 'Switch to "MFA Portal" tab. Input "124056" and click Enroll MFA.', summary: 'Configure Authenticator keys.', whyNeeded: 'Physical checks must be backed up by active MFA keys.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_mfa', expectedOutput: 'true' },
      { id: '5', title: 'Report urgent CEO impersonations request', instruction: 'Switch to "Email Inbox" tab. Select "ceo_giftcard" and click Report as Phishing.', summary: 'Report threat mail.', whyNeeded: 'Urgent mail templates try to trick users into sharing privacy keys.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_inbox', expectedOutput: 'true' }
    ]
  },
  {
    projectId: 'esp-project-remote',
    environment: 'linux',
    description: 'Capstone: Remote Work Setup. Establish secure VPN tunnels, configure home Wi-Fi keys, and prevent data leakage.',
    objective: 'Deploy secure remote workspace tunnels.',
    missionNumber: 1, totalMissions: 5, xpReward: 400,
    steps: [
      { id: '1', title: 'Configure remote access MFA key', instruction: 'Switch to "MFA Portal" tab. Input "124056" and click Enroll MFA.', summary: 'Enforce remote MFA validation.', whyNeeded: 'Remote access requires strict multi-factor validations.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_mfa', expectedOutput: 'true' },
      { id: '2', title: 'Lock unattended remote workspace display', instruction: 'Switch to "Clean Desk" tab. Lock active screen and verify.', summary: 'Lock laptop monitor.', whyNeeded: 'Remote screens must be locked when unattended.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk', expectedOutput: 'true' },
      { id: '3', title: 'Flag hijacked VPN portals domain', instruction: 'Switch to "URL Inspector" tab. Enter "microsoft-security-auth.net" and click Flag Threat.', summary: 'Flag spoof host domain.', whyNeeded: 'Domain lookalikes fool users during logins.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_url', expectedOutput: 'true' },
      { id: '4', title: 'Report external CEO gift cards mail', instruction: 'Switch to "Email Inbox" tab. Select "ceo_giftcard" and click Report as Phishing.', summary: 'Report threat mail.', whyNeeded: 'Phishing vectors impersonate executives to bypass account controls.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_inbox', expectedOutput: 'true' },
      { id: '5', title: 'Clear local credentials notes', instruction: 'Verify all physical items are locked and sticky notes cleared under "Clean Desk" tab, click verify.', summary: 'Complete physical clean check.', whyNeeded: 'Clean desks minimize target exposure.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk_all', expectedOutput: 'true' }
    ]
  },
  {
    projectId: 'esp-project-incident',
    environment: 'linux',
    description: 'Capstone: Enterprise Incident Response. Review system alerts headers, report attacks, and initiate recovery.',
    objective: 'Flag incident breach indicators.',
    missionNumber: 1, totalMissions: 5, xpReward: 400,
    steps: [
      { id: '1', title: 'Flag hijacked host threat domain', instruction: 'Switch to "URL Inspector" tab. Enter "microsoft-security-auth.net" and click Flag Threat.', summary: 'Report threat domain host.', whyNeeded: 'Identifying threat links allows administrators to black-list domains block wide.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_url', expectedOutput: 'true' },
      { id: '2', title: 'Report active inbox phishing mail', instruction: 'Switch to "Email Inbox" tab. Select "ceo_giftcard" and click Report as Phishing.', summary: 'Report threat mail.', whyNeeded: 'Phishing reports initiate containment.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_inbox', expectedOutput: 'true' },
      { id: '3', title: 'Secure exposed local logins', instruction: 'Switch to "Clean Desk" tab. Remove yellow sticky note password card and verify.', summary: 'Secure credentials cards.', whyNeeded: 'Incident containments demand clearing paper logs.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk', expectedOutput: 'true' },
      { id: '4', title: 'Validate accounts MFA token credentials', instruction: 'Switch to "MFA Portal" tab. Input "124056" and click Enroll MFA.', summary: 'Configure Authenticator keys.', whyNeeded: 'Secure authentication is required during incident reviews.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_mfa', expectedOutput: 'true' },
      { id: '5', title: 'Lock all active office terminals', instruction: 'Verify screen locked and notes cleared on "Clean Desk" tab, click verify.', summary: 'Execute final containment audit.', whyNeeded: 'Locking all stations blocks active lateral threat movements.', pillarConnection: 'Security Awareness', commands: [], checkCommand: 'esp_action_desk_all', expectedOutput: 'true' }
    ]
  }
];
