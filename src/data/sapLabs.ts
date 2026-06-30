import { LabContent } from '../types/content';

export const sapLabs: LabContent[] = [
  // LEVEL 1: SAP Foundations
  {
    projectId: 'sap-intro',
    environment: 'linux',
    description: 'Understand the SAP ecosystem, ERP systems, architecture, GUI navigation, and client landscapes.',
    objective: 'Explore the foundations of SAP ERP and S/4HANA.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Explore the SAP ecosystem', instruction: 'Enter the Transaction Code "ECO" in the command bar to open the ecosystem map.', summary: 'Launch ecosystem.', whyNeeded: 'Exploring product suites outlines resource bounds.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_eco', expectedOutput: 'ECO' },
      { id: '2', title: 'Understand SAP ERP vs SAP S/4HANA', instruction: 'Enter "S4HANA" in the command field to switch database view layers.', summary: 'Compare ERP architectures.', whyNeeded: 'S/4HANA replaces legacy disk storage with in-memory HANA models.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sap_s4hana_comp', expectedOutput: 'S4HANA' },
      { id: '3', title: 'SAP GUI vs SAP Fiori', instruction: 'Toggle the Fiori tab in the header bar and switch to Fiori interface.', summary: 'Analyze client options.', whyNeeded: 'Fiori provides responsive web views; GUI offers classic transaction grids.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_fiori_gui', expectedOutput: 'fiori' },
      { id: '4', title: 'SAP architecture', instruction: 'Return to SAP GUI. Type "ARCH" in the command field to view three-tier layouts.', summary: 'Examine system layers.', whyNeeded: 'SAP uses database, application server, and presentation client tiers.', pillarConnection: 'Security', commands: [], checkCommand: 'sap_arch', expectedOutput: 'ARCH' },
      { id: '5', title: 'SAP landscapes (DEV, QA, PRD)', instruction: 'Type "LAND" in the command field to inspect dev-test routes.', summary: 'Inspect landscapes.', whyNeeded: 'Isolating developers from production runs secures enterprise operations.', pillarConnection: 'Security', commands: [], checkCommand: 'sap_landscape', expectedOutput: 'LAND' },
      { id: '6', title: 'SAP client concept', instruction: 'Type "CLIENT" in the command field to display client separation data.', summary: 'Observe clients.', whyNeeded: 'Client boundaries isolate user configuration in single server hosts.', pillarConnection: 'Security', commands: [], checkCommand: 'sap_client', expectedOutput: 'CLIENT' },
      { id: '7', title: 'SAP transport system', instruction: 'Type "/NSTMS" in the command field to open the transport organizer screen.', summary: 'Analyze transport rules.', whyNeeded: 'Transports copy configuration objects between landscape hosts.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_stms_tcode', expectedOutput: 'STMS' },
      { id: '8', title: 'SAP navigation', instruction: 'Navigate back to Easy Access by entering "/N" in the command bar.', summary: 'Familiarize with navigation.', whyNeeded: 'Navigation speeds up operator workflow.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_nav_menu', expectedOutput: 'EASY_ACCESS' }
    ]
  },
  {
    projectId: 'sap-install',
    environment: 'linux',
    description: 'Learn to install the SAP GUI client, log in, configure user profiles, and create Easy Access shortcuts.',
    objective: 'Install SAP GUI and establish server sessions.',
    missionNumber: 1, totalMissions: 1, xpReward: 150,
    steps: [
      { id: '1', title: 'Installing SAP GUI', instruction: 'Enter "GUI_INSTALL" in the command bar to verify the installation path.', summary: 'Install client.', whyNeeded: 'Presentation GUI layers bind user events to background servers.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_gui_inst', expectedOutput: 'GUI_INSTALL' },
      { id: '2', title: 'Connecting to an SAP server', instruction: 'Type "CONNECT" in the command field to establish server handshakes.', summary: 'Establish connection.', whyNeeded: 'SAP requires gateway router definitions to authenticate remote clients.', pillarConnection: 'Security', commands: [], checkCommand: 'sap_server_conn', expectedOutput: 'CONNECT' },
      { id: '3', title: 'Logging in', instruction: 'Type "/NSU01" in the command field to load the login validation screen.', summary: 'Verify credentials.', whyNeeded: 'Authentication gates access to corporate ledgers.', pillarConnection: 'Security', commands: [], checkCommand: 'sap_login', expectedOutput: 'SU01' },
      { id: '4', title: 'User profiles', instruction: 'Under SU01 User field, type "DEVELOPER" to initialize the user profile configuration.', summary: 'Assign user.', whyNeeded: 'User profiles bind operator parameters to active sessions.', pillarConnection: 'Security', commands: [], checkCommand: 'sap_profiles', expectedOutput: 'DEVELOPER' },
      { id: '5', title: 'SAP Easy Access', instruction: 'Type "/N" in the command field to load the main Easy Access navigation tree.', summary: 'Verify Easy Access.', whyNeeded: 'Easy Access provides access to all authorized transaction trees.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_easy_access', expectedOutput: 'EASY_ACCESS' },
      { id: '6', title: 'Favorites', instruction: 'Type "FAV" in the command bar to add transaction shortcuts.', summary: 'Pin favorites.', whyNeeded: 'Favorites speed up daily routines by eliminating path searching.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_favorites', expectedOutput: 'FAV' },
      { id: '7', title: 'Personalization', instruction: 'Type "PERS" in the command bar to customize GUI themes.', summary: 'Apply themes.', whyNeeded: 'Personalization matches interface variables to user preferences.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_pers', expectedOutput: 'PERS' },
      { id: '8', title: 'SAP shortcuts', instruction: 'Type "SHORTCUT" in the command bar to verify active desk widgets.', summary: 'Add shortcuts.', whyNeeded: 'Shortcuts launch transaction screens directly from the OS desktop.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_shortcuts', expectedOutput: 'SHORTCUT' }
    ]
  },
  {
    projectId: 'sap-navigation',
    environment: 'linux',
    description: 'Master SAP transaction codes (T-Codes), menus, variants, search helps, and session controls.',
    objective: 'Navigate SAP application servers.',
    missionNumber: 1, totalMissions: 1, xpReward: 150,
    steps: [
      { id: '1', title: 'Transactions (T-Codes)', instruction: 'Navigate to "SU01" to verify transaction code routing.', summary: 'Route with T-Codes.', whyNeeded: 'T-Codes jump to SAP program codes immediately.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_tcode_su01', expectedOutput: 'SU01' },
      { id: '2', title: 'Menus', instruction: 'Type "/N" to verify main menu tree views.', summary: 'Check menus.', whyNeeded: 'Menus map modules for business processing.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_menus', expectedOutput: 'EASY_ACCESS' },
      { id: '3', title: 'Search helps', instruction: 'Type "F4" in the command field to trigger data lookup suggestions.', summary: 'Enable F4 search.', whyNeeded: 'Search help indexes database keys.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sap_search_help', expectedOutput: 'F4' },
      { id: '4', title: 'Variants', instruction: 'Type "VARIANT" in the command bar to customize report parameters.', summary: 'Save variant.', whyNeeded: 'Variants store repetitive input parameters.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_variants', expectedOutput: 'VARIANT' },
      { id: '5', title: 'Layouts', instruction: 'Type "LAYOUT" in the command bar to adjust grid outputs.', summary: 'Set layouts.', whyNeeded: 'Layouts format lists for presentation.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_layouts', expectedOutput: 'LAYOUT' },
      { id: '6', title: 'Multiple sessions', instruction: 'Type "/O" in the command field to trigger active session monitors.', summary: 'Create session.', whyNeeded: 'Multiple sessions allow executing parallel transactions.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_sessions', expectedOutput: 'SESSIONS' },
      { id: '7', title: 'SAP command field', instruction: 'Type "CMD" in the command field to highlight command structures.', summary: 'Verify command bar.', whyNeeded: 'The command field routes GUI screens dynamically.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_command_field', expectedOutput: 'CMD' },
      { id: '8', title: 'System status', instruction: 'Type "STATUS" in the command bar to check system parameters.', summary: 'Check system status.', whyNeeded: 'Status reports system kernel release versions.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_sys_status', expectedOutput: 'STATUS' }
    ]
  },
  {
    projectId: 'sap-security',
    environment: 'linux',
    description: 'Learn security basics: manage users, create roles, assign authorization profiles, and analyze authorization errors.',
    objective: 'Enforce SAP user security rules.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Users', instruction: 'Open "SU01" and enter "DEVELOPER" in the User input field.', summary: 'Create user account.', whyNeeded: 'Users authorize personnel access in the active client.', pillarConnection: 'Security', commands: [], checkCommand: 'sec_user', expectedOutput: 'DEVELOPER' },
      { id: '2', title: 'Roles', instruction: 'Under Role field in SU01, type "SAP_ALL" to verify role assignments.', summary: 'Assign security role.', whyNeeded: 'Roles group authorization objects.', pillarConnection: 'Security', commands: [], checkCommand: 'sec_role', expectedOutput: 'SAP_ALL' },
      { id: '3', title: 'Profiles', instruction: 'Type "PROF" in the command bar to check system security profiles.', summary: 'Verify profiles.', whyNeeded: 'Profiles map low-level system permissions to the OS.', pillarConnection: 'Security', commands: [], checkCommand: 'sec_profiles', expectedOutput: 'PROF' },
      { id: '4', title: 'Authorization concepts', instruction: 'Type "AUTH" in the command bar to check object checks.', summary: 'Analyze authorizations.', whyNeeded: 'Permissions block database write paths.', pillarConnection: 'Security', commands: [], checkCommand: 'sec_auth', expectedOutput: 'AUTH' },
      { id: '5', title: 'Password management', instruction: 'Under password field in SU01, enter "InitPass123" to set credentials.', summary: 'Set password policies.', whyNeeded: 'Strong passwords protect administrative users.', pillarConnection: 'Security', commands: [], checkCommand: 'sec_password', expectedOutput: 'InitPass123' },
      { id: '6', title: 'SU01 basics', instruction: 'Save the SU01 user by clicking "Save User Profile".', summary: 'Save SU01 records.', whyNeeded: 'Committing SU01 updates the active user database.', pillarConnection: 'Security', commands: [], checkCommand: 'sec_su01_save', expectedOutput: 'true' },
      { id: '7', title: 'Authorization errors', instruction: 'Type "/NSU53" in the command field to open the authorization check debugger.', summary: 'Open SU53.', whyNeeded: 'SU53 reports failed permission checks to SREs.', pillarConnection: 'Security', commands: [], checkCommand: 'sec_su53', expectedOutput: 'SU53' }
    ]
  },

  // LEVEL 2: SAP Business Processes
  {
    projectId: 'sap-finance',
    environment: 'linux',
    description: 'Configure Finance (FI) elements: company codes, Chart of Accounts, journal entries, invoice processing, and reconciliations.',
    objective: 'Manage general ledger records.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'Company code', instruction: 'Type "FI_COMP" in the command bar to configure company code bounds.', summary: 'Define company code.', whyNeeded: 'Company codes define isolated reporting entities.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fi_comp', expectedOutput: 'FI_COMP' },
      { id: '2', title: 'General Ledger', instruction: 'Type "/NFB50" to load General Ledger posting (FB50).', summary: 'Load G/L ledger.', whyNeeded: 'Ledgers organize accounting journal entries.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fi_gl', expectedOutput: 'FB50' },
      { id: '3', title: 'Chart of Accounts', instruction: 'Type "COA" in the command bar to configure accounts schemas.', summary: 'Define COA rules.', whyNeeded: 'COA schemas organize standard corporate accounts.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fi_coa', expectedOutput: 'COA' },
      { id: '4', title: 'Journal entries', instruction: 'Type "JOURNAL" in the command bar to post ledger adjustments.', summary: 'Apply journal entries.', whyNeeded: 'Journals log transactional adjustments.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fi_journal', expectedOutput: 'JOURNAL' },
      { id: '5', title: 'Customer invoices', instruction: 'Type "CUST_INV" in the command bar to process customer invoices.', summary: 'Register customer bills.', whyNeeded: 'Invoices document sales receivables.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fi_cust_inv', expectedOutput: 'CUST_INV' },
      { id: '6', title: 'Vendor invoices', instruction: 'Type "VEND_INV" in the command bar to process vendor invoice payments.', summary: 'Register vendor bills.', whyNeeded: 'Vendor invoices check raw item purchases.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fi_vend_inv', expectedOutput: 'VEND_INV' },
      { id: '7', title: 'Payment processing', instruction: 'Type "PAYMENT" in the command bar to initiate banking outflows.', summary: 'Process payments.', whyNeeded: 'Payment programs settle liabilities.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fi_payment', expectedOutput: 'PAYMENT' },
      { id: '8', title: 'Bank reconciliation', instruction: 'Type "RECON" in the command bar to reconcile ledger statements.', summary: 'Reconcile bank books.', whyNeeded: 'Reconciliations confirm cash ledger balances match banking reports.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fi_recon', expectedOutput: 'RECON' },
      { id: '9', title: 'Financial reports', instruction: 'Type "FI_REPORTS" in the command bar to load trial balance outputs.', summary: 'Generate financial reports.', whyNeeded: 'Reports compile balance sheet positions for auditing.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fi_reports', expectedOutput: 'FI_REPORTS' }
    ]
  },
  {
    projectId: 'sap-controlling',
    environment: 'linux',
    description: 'Configure Controlling (CO) elements: cost centers, profit centers, internal orders, allocation rules, and costing models.',
    objective: 'Implement cost management targets.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'Cost centers', instruction: 'Type "COST_CTR" in the command bar to monitor cost centers.', summary: 'Allocate cost center.', whyNeeded: 'Cost centers monitor departments expenses.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'co_cost_ctr', expectedOutput: 'COST_CTR' },
      { id: '2', title: 'Profit centers', instruction: 'Type "PROFIT_CTR" in the command bar to verify profit centers.', summary: 'Allocate profit center.', whyNeeded: 'Profit centers isolate margin allocations.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'co_profit_ctr', expectedOutput: 'PROFIT_CTR' },
      { id: '3', title: 'Internal orders', instruction: 'Type "INT_ORDER" in the command bar.', summary: 'Apply internal orders.', whyNeeded: 'Orders track marketing campaign budgets.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'co_int_order', expectedOutput: 'INT_ORDER' },
      { id: '4', title: 'Cost allocation', instruction: 'Type "ALLOCATION" in the command bar.', summary: 'Distribute costs.', whyNeeded: 'Allocations spread utilities overheads across divisions.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'co_allocation', expectedOutput: 'ALLOCATION' },
      { id: '5', title: 'Product costing', instruction: 'Type "PRODUCT_COST" in the command bar.', summary: 'Solve production costing.', whyNeeded: 'Costing solves inventory valuation.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'co_prod_cost', expectedOutput: 'PRODUCT_COST' },
      { id: '6', title: 'Profitability analysis', instruction: 'Type "CO_PA" in the command bar to load margin reports.', summary: 'Load CO-PA.', whyNeeded: 'Profitability reports show sales channels profits.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'co_pa', expectedOutput: 'CO_PA' }
    ]
  },
  {
    projectId: 'sap-sales',
    environment: 'linux',
    description: 'Process Sales and Distribution (SD) flows: customer masters, pricing, shipping, packing, and billing.',
    objective: 'Complete order-to-cash (O2C) processing.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'Customer master', instruction: 'Type "CUST_MAST" in the command bar to check accounts.', summary: 'Load customer records.', whyNeeded: 'Customer masters list delivery addresses and shipping instructions.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sd_cust_mast', expectedOutput: 'CUST_MAST' },
      { id: '2', title: 'Sales orders', instruction: 'Navigate to "VA01". Enter "100240" in the Sold-To field and "MAT-01" in the Material field.', summary: 'Post sales order.', whyNeeded: 'Sales orders log buyer commitments.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sd_sales_orders', expectedOutput: 'VA01' },
      { id: '3', title: 'Pricing', instruction: 'Type "PRICING" in the command bar to check sales conditions.', summary: 'Calculate pricing.', whyNeeded: 'Pricing systems determine sales discounts.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sd_pricing', expectedOutput: 'PRICING' },
      { id: '4', title: 'Delivery', instruction: 'Type "DELIVERY" in the command bar.', summary: 'Post delivery.', whyNeeded: 'Delivery schedules shipments.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sd_delivery', expectedOutput: 'DELIVERY' },
      { id: '5', title: 'Picking', instruction: 'Type "PICKING" in the command bar.', summary: 'Pick warehouse items.', whyNeeded: 'Picking transfers stock items to loading docks.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sd_picking', expectedOutput: 'PICKING' },
      { id: '6', title: 'Packing', instruction: 'Type "PACKING" in the command bar.', summary: 'Pack items.', whyNeeded: 'Packing groups boxes into pallets.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sd_packing', expectedOutput: 'PACKING' },
      { id: '7', title: 'Shipping', instruction: 'Type "SHIPPING" in the command bar.', summary: 'Post shipment.', whyNeeded: 'Shipping verifies truck handoffs.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sd_shipping', expectedOutput: 'SHIPPING' },
      { id: '8', title: 'Billing', instruction: 'Type "BILLING" in the command bar.', summary: 'Create invoice billing.', whyNeeded: 'Billing issues customer invoices.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sd_billing', expectedOutput: 'BILLING' },
      { id: '9', title: 'Returns', instruction: 'Type "RETURNS" in the command bar.', summary: 'Process returns.', whyNeeded: 'Returns credit customers for damaged stock.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sd_returns', expectedOutput: 'RETURNS' }
    ]
  },
  {
    projectId: 'sap-materials',
    environment: 'linux',
    description: 'Process Materials Management (MM) flows: material master, purchase requisitions, POs, goods receipts, and invoices.',
    objective: 'Complete procure-to-pay (P2P) setups.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'Material master', instruction: 'Type "MAT_MAST" in the command bar to inspect material records.', summary: 'Check material masters.', whyNeeded: 'Material master records list weights and categories.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'mm_mat_mast', expectedOutput: 'MAT_MAST' },
      { id: '2', title: 'Vendors', instruction: 'Type "VENDORS" in the command bar to check supplier credentials.', summary: 'Check vendors.', whyNeeded: 'Vendor parameters specify payment terms.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'mm_vendors', expectedOutput: 'VENDORS' },
      { id: '3', title: 'Purchase requisitions', instruction: 'Type "PURCH_REQ" in the command bar.', summary: 'Post purchase req.', whyNeeded: 'Requisitions ask procurement to acquire stock.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'mm_req', expectedOutput: 'PURCH_REQ' },
      { id: '4', title: 'Purchase orders', instruction: 'Navigate to "ME21N". Enter "VEND-01" in the Vendor field and "1000" in the PurchOrg field.', summary: 'Post purchase order.', whyNeeded: 'Purchase orders legalize vendor acquisitions.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'mm_po', expectedOutput: 'ME21N' },
      { id: '5', title: 'Goods receipt', instruction: 'Type "GOODS_REC" in the command bar to post warehouse delivery receipts.', summary: 'Log goods receipt.', whyNeeded: 'Receipts log item handoffs in inventory databases.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'mm_receipt', expectedOutput: 'GOODS_REC' },
      { id: '6', title: 'Invoice verification', instruction: 'Type "INV_VERIF" in the command bar.', summary: 'Verify vendor invoices.', whyNeeded: 'Invoice verification checks PO rates.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'mm_verif', expectedOutput: 'INV_VERIF' },
      { id: '7', title: 'Inventory management', instruction: 'Type "INV_MGMT" in the command bar.', summary: 'Check inventory.', whyNeeded: 'Inventory tracks storage location metrics.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'mm_mgmt', expectedOutput: 'INV_MGMT' },
      { id: '8', title: 'Physical inventory', instruction: 'Type "PHYS_INV" in the command bar.', summary: 'Process physical count.', whyNeeded: 'Physical inventory reconciles books to storage locations.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'mm_physical', expectedOutput: 'PHYS_INV' }
    ]
  },
  {
    projectId: 'sap-warehouse',
    environment: 'linux',
    description: 'Learn storage locations, put-away strategies, stock picks, inventory movements, and warehouse transfers.',
    objective: 'Coordinate stock storage movements.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Storage locations', instruction: 'Type "STOR_LOC" in the command bar.', summary: 'Map storage zones.', whyNeeded: 'Locations trace stock to specific warehouse rows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'wm_loc', expectedOutput: 'STOR_LOC' },
      { id: '2', title: 'Bins', instruction: 'Type "BINS" in the command bar.', summary: 'Examine storage bins.', whyNeeded: 'Bins track exact inventory coordinates.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'wm_bins', expectedOutput: 'BINS' },
      { id: '3', title: 'Put-away', instruction: 'Type "PUT_AWAY" in the command bar.', summary: 'Execute put-away.', whyNeeded: 'Put-away routes incoming stock to storage positions.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'wm_putaway', expectedOutput: 'PUT_AWAY' },
      { id: '4', title: 'Picking', instruction: 'Type "WM_PICKING" in the command bar.', summary: 'Execute warehouse picking.', whyNeeded: 'Picking locates stock for outbound transport.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'wm_picking', expectedOutput: 'WM_PICKING' },
      { id: '5', title: 'Inventory movements', instruction: 'Type "MOVEMENTS" in the command bar.', summary: 'Log stock movements.', whyNeeded: 'Movements record transfers.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'wm_movements', expectedOutput: 'MOVEMENTS' },
      { id: '6', title: 'Warehouse transfers', instruction: 'Type "TRANSFERS" in the command bar.', summary: 'Run warehouse transfer.', whyNeeded: 'Transports shift inventory blocks.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'wm_transfers', expectedOutput: 'TRANSFERS' }
    ]
  },
  {
    projectId: 'sap-production',
    environment: 'linux',
    description: 'Master Production Planning (PP) flows: Bill of Materials (BOM), work centers, routing, MRP runs, and capacity planning.',
    objective: 'Configure manufacturing MRP runs.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Bill of Materials', instruction: 'Type "BOM" in the command bar.', summary: 'Structure BOM.', whyNeeded: 'BOM structures compile assembly recipes.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pp_bom', expectedOutput: 'BOM' },
      { id: '2', title: 'Work Centers', instruction: 'Type "WORK_CTR" in the command bar.', summary: 'Examine work centers.', whyNeeded: 'Work centers monitor machinery capacity limits.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pp_work_ctr', expectedOutput: 'WORK_CTR' },
      { id: '3', title: 'Routing', instruction: 'Type "ROUTING" in the command bar.', summary: 'Design routing steps.', whyNeeded: 'Routing defines step sequences.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pp_routing', expectedOutput: 'ROUTING' },
      { id: '4', title: 'Production Orders', instruction: 'Type "PROD_ORDER" in the command bar.', summary: 'Post production order.', whyNeeded: 'Production orders authorize factories to assemble items.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pp_prod_order', expectedOutput: 'PROD_ORDER' },
      { id: '5', title: 'MRP', instruction: 'Type "MRP" in the command bar.', summary: 'Initiate MRP run.', whyNeeded: 'MRP calculates raw items shortages.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pp_mrp', expectedOutput: 'MRP' },
      { id: '6', title: 'Capacity Planning', instruction: 'Type "CAPACITY" in the command bar.', summary: 'Analyze capacity.', whyNeeded: 'Planning checks factory bottlenecks.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pp_capacity', expectedOutput: 'CAPACITY' },
      { id: '7', title: 'Shop Floor Control', instruction: 'Type "SHOP_FLOOR" in the command bar.', summary: 'Post floor control logs.', whyNeeded: 'Floor controls log runtime operations.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pp_floor', expectedOutput: 'SHOP_FLOOR' }
    ]
  },
  {
    projectId: 'sap-quality',
    environment: 'linux',
    description: 'Process Quality Management (QM) parameters: inspection lots, quality notifications, and usage decisions.',
    objective: 'Manage quality notifications.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Inspection lots', instruction: 'Type "INSP_LOT" in the command bar.', summary: 'Examine inspection lots.', whyNeeded: 'Inspection lots queue inventory for testing.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'qm_lot', expectedOutput: 'INSP_LOT' },
      { id: '2', title: 'Quality notifications', instruction: 'Type "QUAL_NOTIF" in the command bar.', summary: 'Log quality error.', whyNeeded: 'Notifications record supplier errors.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'qm_notif', expectedOutput: 'QUAL_NOTIF' },
      { id: '3', title: 'Inspection plans', instruction: 'Type "INSP_PLANS" in the command bar.', summary: 'Verify inspection plans.', whyNeeded: 'Plans specify measurement values.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'qm_plans', expectedOutput: 'INSP_PLANS' },
      { id: '4', title: 'Usage decisions', instruction: 'Type "USAGE_DEC" in the command bar.', summary: 'Post usage decision.', whyNeeded: 'Decisions release checked stock back to warehouses.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'qm_dec', expectedOutput: 'USAGE_DEC' },
      { id: '5', title: 'Certificates', instruction: 'Type "CERTIFICATES" in the command bar.', summary: 'Print certificates.', whyNeeded: 'Certificates verify compliance to buyers.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'qm_cert', expectedOutput: 'CERTIFICATES' }
    ]
  },
  {
    projectId: 'sap-plant',
    environment: 'linux',
    description: 'Manage Plant Maintenance (PM): equipments, functional locations, and preventive work orders.',
    objective: 'Process plant maintenance schedules.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Equipment', instruction: 'Type "EQUIPMENT" in the command bar.', summary: 'Examine equipment logs.', whyNeeded: 'Equipment records monitor machinery maintenance schedules.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pm_equip', expectedOutput: 'EQUIPMENT' },
      { id: '2', title: 'Functional locations', instruction: 'Type "FUNC_LOC" in the command bar.', summary: 'Map functional location.', whyNeeded: 'Locations arrange machinery into physical layouts.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pm_loc', expectedOutput: 'FUNC_LOC' },
      { id: '3', title: 'Maintenance orders', instruction: 'Type "MAINT_ORDERS" in the command bar.', summary: 'Schedule maintenance.', whyNeeded: 'Orders assign technicians to repair gear.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pm_orders', expectedOutput: 'MAINT_ORDERS' },
      { id: '4', title: 'Notifications', instruction: 'Type "PM_NOTIF" in the command bar.', summary: 'Log PM notification.', whyNeeded: 'Notifications report failures to operators.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pm_notif', expectedOutput: 'PM_NOTIF' },
      { id: '5', title: 'Preventive maintenance', instruction: 'Type "PREVENTIVE" in the command bar.', summary: 'Process preventive run.', whyNeeded: 'Preventive schedules minimize emergency outages.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pm_preventive', expectedOutput: 'PREVENTIVE' }
    ]
  },
  {
    projectId: 'sap-hcm',
    environment: 'linux',
    description: 'Master Human Capital Management (HCM) configurations: employee infotypes, payroll, and time management.',
    objective: 'Manage employee payroll records.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Employee records', instruction: 'Type "EMP_RECORDS" in the command bar.', summary: 'Load employee info.', whyNeeded: 'Employee infotypes record basic metadata details.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'hcm_records', expectedOutput: 'EMP_RECORDS' },
      { id: '2', title: 'Payroll', instruction: 'Type "PAYROLL" in the command bar.', summary: 'Calculate employee payroll.', whyNeeded: 'Payroll calculations process tax distributions.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'hcm_payroll', expectedOutput: 'PAYROLL' },
      { id: '3', title: 'Time management', instruction: 'Type "TIME_MGMT" in the command bar.', summary: 'Log time tracking.', whyNeeded: 'Time metrics track employee hourly logs.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'hcm_time', expectedOutput: 'TIME_MGMT' },
      { id: '4', title: 'Organizational management', instruction: 'Type "ORG_MGMT" in the command bar.', summary: 'Map org departments.', whyNeeded: 'Org maps display administrative reports.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'hcm_org', expectedOutput: 'ORG_MGMT' },
      { id: '5', title: 'Recruitment', instruction: 'Type "RECRUITMENT" in the command bar.', summary: 'Verify recruitment path.', whyNeeded: 'Recruitment tracks applicant pipelines.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'hcm_recruit', expectedOutput: 'RECRUITMENT' }
    ]
  },

  // LEVEL 3: SAP S/4HANA
  {
    projectId: 'sap-s4hana',
    environment: 'linux',
    description: 'Analyze SAP S/4HANA features: Universal Journal, Business Partner configurations, and simplification items.',
    objective: 'Configure business partner accounts.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'S/4HANA overview', instruction: 'Type "S4_OVERVIEW" in the command bar.', summary: 'Inspect S/4HANA.', whyNeeded: 'S/4HANA uses in-memory column tables.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 's4_overview', expectedOutput: 'S4_OVERVIEW' },
      { id: '2', title: 'Universal Journal', instruction: 'Type "UNIV_JOURNAL" in the command bar.', summary: 'Analyze Universal Journal.', whyNeeded: 'ACDOCA table combines accounting, asset, and controlling tables.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 's4_journal', expectedOutput: 'UNIV_JOURNAL' },
      { id: '3', title: 'Business Partner', instruction: 'Type "BP_TCODE" in the command bar to open BP setup.', summary: 'Load BP console.', whyNeeded: 'Business Partner unifies customer and vendor master files.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 's4_bp', expectedOutput: 'BP_TCODE' },
      { id: '4', title: 'Simplification items', instruction: 'Type "SIMPLIFICATION" in the command bar.', summary: 'Check simplification checklist.', whyNeeded: 'Simplification checklists identify deprecated tables.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 's4_simplification', expectedOutput: 'SIMPLIFICATION' },
      { id: '5', title: 'Fiori Launchpad', instruction: 'Switch to the Fiori interface tab in the toolbar.', summary: 'Open Fiori Launchpad.', whyNeeded: 'Fiori serves as the main entrance for S/4HANA clients.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_fiori_gui', expectedOutput: 'fiori' }
    ]
  },
  {
    projectId: 'sap-fiori',
    environment: 'linux',
    description: 'Learn Fiori Launchpad administration, tiles configurations, catalogs, groups, and pages.',
    objective: 'Enforce Fiori catalogs controls.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'Launchpad', instruction: 'Switch to Fiori view and verify access.', summary: 'Check Launchpad.', whyNeeded: 'Launchpad routes access to active tiles.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'sap_fiori_gui', expectedOutput: 'fiori' },
      { id: '2', title: 'Tiles', instruction: 'Return to GUI. Type "TILES" in the command bar.', summary: 'Examine Fiori tiles.', whyNeeded: 'Tiles display real-time app notifications.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'fiori_tiles', expectedOutput: 'TILES' },
      { id: '3', title: 'Apps', instruction: 'Type "FIORI_APPS" in the command bar.', summary: 'Inspect Fiori apps.', whyNeeded: 'Apps bind HTML5 clients to background APIs.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'fiori_apps', expectedOutput: 'FIORI_APPS' },
      { id: '4', title: 'Catalogs', instruction: 'Type "CATALOGS" in the command bar.', summary: 'Group tiles into catalogs.', whyNeeded: 'Catalogs regulate user app views.', pillarConnection: 'Security', commands: [], checkCommand: 'fiori_catalogs', expectedOutput: 'CATALOGS' },
      { id: '5', title: 'Groups', instruction: 'Type "GROUPS" in the command bar.', summary: 'Form tile groups.', whyNeeded: 'Groups arrange tiles on landing dashboards.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'fiori_groups', expectedOutput: 'GROUPS' },
      { id: '6', title: 'Spaces', instruction: 'Type "SPACES" in the command bar.', summary: 'Configure Fiori spaces.', whyNeeded: 'Spaces define navigation tabs.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'fiori_spaces', expectedOutput: 'SPACES' },
      { id: '7', title: 'Pages', instruction: 'Type "PAGES" in the command bar.', summary: 'Configure Fiori pages.', whyNeeded: 'Pages group widgets within spaces.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'fiori_pages', expectedOutput: 'PAGES' }
    ]
  },
  {
    projectId: 'sap-hana',
    environment: 'linux',
    description: 'Learn HANA Database views, SQL queries, calculation views, and structural modeling.',
    objective: 'Design SQL calculation views.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'HANA Studio', instruction: 'Type "HANA_STUDIO" in the command bar to open the IDE.', summary: 'Verify HANA IDE.', whyNeeded: 'HANA Studio manages catalog tables.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'db_studio', expectedOutput: 'HANA_STUDIO' },
      { id: '2', title: 'In-Memory Database', instruction: 'Type "IN_MEMORY" in the command bar.', summary: 'Inspect HANA memory footprint.', whyNeeded: 'In-memory stores columns directly in RAM.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'db_in_memory', expectedOutput: 'IN_MEMORY' },
      { id: '3', title: 'Views', instruction: 'Type "HANA_VIEWS" in the command bar.', summary: 'Inspect SQL views.', whyNeeded: 'HANA views accelerate query execution.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'db_views', expectedOutput: 'HANA_VIEWS' },
      { id: '4', title: 'SQL', instruction: 'Type "SQL_QUERY" in the command bar.', summary: 'Execute database query.', whyNeeded: 'SQL retrieves data rows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'db_sql', expectedOutput: 'SQL_QUERY' },
      { id: '5', title: 'Calculation Views', instruction: 'Type "CALC_VIEWS" in the command bar.', summary: 'Design calculation view.', whyNeeded: 'Calculation views process multi-table joins.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'db_calc_views', expectedOutput: 'CALC_VIEWS' },
      { id: '6', title: 'Modeling', instruction: 'Type "MODELING" in the command bar.', summary: 'Model column schemas.', whyNeeded: 'Modeling links tables.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'db_modeling', expectedOutput: 'MODELING' }
    ]
  },

  // LEVEL 4: SAP Administration (Basis)
  {
    projectId: 'sap-basis',
    environment: 'linux',
    description: 'Manage Basis administration: work processes, kernel upgrades, profiles, and landscapes.',
    objective: 'Inspect active work processes.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'SAP system architecture', instruction: 'Type "SYSTEM_ARCH" in the command bar.', summary: 'Map Basis layers.', whyNeeded: 'Basis handles middleware services.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'bas_arch', expectedOutput: 'SYSTEM_ARCH' },
      { id: '2', title: 'Instances', instruction: 'Type "INSTANCES" in the command bar.', summary: 'Check active instances.', whyNeeded: 'Instances group processes on servers.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'bas_instances', expectedOutput: 'INSTANCES' },
      { id: '3', title: 'Work processes', instruction: 'Navigate to "SM50" to monitor active tasks.', summary: 'Check work processes.', whyNeeded: 'Work processes execute user programs.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'bas_processes', expectedOutput: 'SM50' },
      { id: '4', title: 'Clients', instruction: 'Type "CLIENTS" in the command bar.', summary: 'Manage clients table.', whyNeeded: 'SCC4 table configures clients.', pillarConnection: 'Security', commands: [], checkCommand: 'bas_clients', expectedOutput: 'CLIENTS' },
      { id: '5', title: 'Kernel', instruction: 'Type "KERNEL" in the command bar.', summary: 'Examine system kernel.', whyNeeded: 'Kernel links programs to host OS.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'bas_kernel', expectedOutput: 'KERNEL' },
      { id: '6', title: 'Profiles', instruction: 'Type "PROFILES" in the command bar.', summary: 'Examine instance profiles.', whyNeeded: 'Profiles configure server memory limits.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'bas_profiles', expectedOutput: 'PROFILES' }
    ]
  },
  {
    projectId: 'sap-basis-user',
    environment: 'linux',
    description: 'Manage user security, mass users creation, roles configurations, and password rules.',
    objective: 'Enforce user password parameters.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'SU01', instruction: 'Navigate to "SU01" to manage user profiles.', summary: 'Load SU01 console.', whyNeeded: 'SU01 configures master records.', pillarConnection: 'Security', commands: [], checkCommand: 'sec_su01_tcode', expectedOutput: 'SU01' },
      { id: '2', title: 'Roles', instruction: 'Under SU01 Role field, type "SAP_ALL" and click save.', summary: 'Check profile roles.', whyNeeded: 'Roles define operational limits.', pillarConnection: 'Security', commands: [], checkCommand: 'sec_roles_save', expectedOutput: 'SAP_ALL' },
      { id: '3', title: 'Profiles', instruction: 'Type "PROFS" in the command bar.', summary: 'Verify profiles table.', whyNeeded: 'Profiles list raw parameters.', pillarConnection: 'Security', commands: [], checkCommand: 'sec_profs', expectedOutput: 'PROFS' },
      { id: '4', title: 'Mass user creation', instruction: 'Type "SU10" in the command field to open mass maintenance.', summary: 'Load SU10 console.', whyNeeded: 'SU10 creates batch users.', pillarConnection: 'Security', commands: [], checkCommand: 'sec_su10', expectedOutput: 'SU10' },
      { id: '5', title: 'Password policies', instruction: 'Type "PASS_POLICY" in the command bar.', summary: 'Inspect password rules.', whyNeeded: 'Policies block weak passwords.', pillarConnection: 'Security', commands: [], checkCommand: 'sec_policy', expectedOutput: 'PASS_POLICY' }
    ]
  },
  {
    projectId: 'sap-basis-transport',
    environment: 'linux',
    description: 'Manage transport routing, queue releases, import/export, and STMS routing configuration.',
    objective: 'Release active transport requests.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Transport requests', instruction: 'Navigate to "STMS". Under Transport Request field, enter "DEVK900124".', summary: 'Trace transport request.', whyNeeded: 'Transports package code updates.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'tr_req', expectedOutput: 'STMS' },
      { id: '2', title: 'Import/export', instruction: 'Click "Release & Import" in the STMS queue panel.', summary: 'Deploy transport request.', whyNeeded: 'Importing copies code updates into target QA client spaces.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'tr_release', expectedOutput: 'true' },
      { id: '3', title: 'STMS', instruction: 'Type "/NSTMS" to open the manager page directly.', summary: 'Load STMS.', whyNeeded: 'STMS configures routes.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'tr_stms', expectedOutput: 'STMS' },
      { id: '4', title: 'CTS', instruction: 'Type "CTS_CONFIG" in the command bar.', summary: 'Configure CTS.', whyNeeded: 'CTS tracks objects history.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'tr_cts', expectedOutput: 'CTS_CONFIG' },
      { id: '5', title: 'Transport routes', instruction: 'Type "ROUTES" in the command bar.', summary: 'Verify transport routes.', whyNeeded: 'Routes map Dev to QA pipelines.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'tr_routes', expectedOutput: 'ROUTES' }
    ]
  },
  {
    projectId: 'sap-basis-monitor',
    environment: 'linux',
    description: 'Monitor application servers performance using work processes overview, system logs, and job outputs.',
    objective: 'Inspect system dumps and crash stack traces.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'SM50', instruction: 'Navigate to "SM50" to inspect process tasks.', summary: 'Launch SM50.', whyNeeded: 'SM50 helps detect stuck loops.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'mon_sm50', expectedOutput: 'SM50' },
      { id: '2', title: 'SM66', instruction: 'Type "SM66" in the command bar to open the global process overview.', summary: 'Launch SM66.', whyNeeded: 'SM66 lists active work across server nodes.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'mon_sm66', expectedOutput: 'SM66' },
      { id: '3', title: 'ST22', instruction: 'Type "ST22" in the command bar to open ABAP dump analysis.', summary: 'Launch ST22.', whyNeeded: 'ST22 traces script compiler errors.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'mon_st22', expectedOutput: 'ST22' },
      { id: '4', title: 'SM21', instruction: 'Type "SM21" in the command bar to inspect system logs.', summary: 'Launch SM21.', whyNeeded: 'SM21 tracks database connections alerts.', pillarConnection: 'Security', commands: [], checkCommand: 'mon_sm21', expectedOutput: 'SM21' },
      { id: '5', title: 'SM37', instruction: 'Type "SM37" in the command bar to check background jobs.', summary: 'Launch SM37.', whyNeeded: 'SM37 monitors batch query execution status.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'mon_sm37', expectedOutput: 'SM37' },
      { id: '6', title: 'Performance monitoring', instruction: 'Type "PERF" in the command bar.', summary: 'Examine performance.', whyNeeded: 'Monitoring system metrics prevents hardware saturation.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'mon_perf', expectedOutput: 'PERF' }
    ]
  },
  {
    projectId: 'sap-basis-backup',
    environment: 'linux',
    description: 'Manage database backup, restore parameters, client copies, and system copy procedures.',
    objective: 'Initiate database backups.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Database backup', instruction: 'Type "BACKUP" in the command bar.', summary: 'Backup database.', whyNeeded: 'Backups safeguard data against server host crashes.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'bk_backup', expectedOutput: 'BACKUP' },
      { id: '2', title: 'Restore', instruction: 'Type "RESTORE" in the command bar.', summary: 'Verify restore configuration.', whyNeeded: 'Restore procedures verify recovery keys.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'bk_restore', expectedOutput: 'RESTORE' },
      { id: '3', title: 'System copy', instruction: 'Type "SYSTEM_COPY" in the command bar.', summary: 'Verify system copy routes.', whyNeeded: 'System copy clones production configurations back to sandbox clients.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'bk_sys_copy', expectedOutput: 'SYSTEM_COPY' },
      { id: '4', title: 'Client copy', instruction: 'Type "CLIENT_COPY" in the command bar.', summary: 'Verify client copy parameters.', whyNeeded: 'Client copy copies tables within the host server.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'bk_client_copy', expectedOutput: 'CLIENT_COPY' }
    ]
  },

  // LEVEL 5: SAP Development (ABAP)
  {
    projectId: 'sap-abap-basics',
    environment: 'linux',
    description: 'Write custom ABAP scripts: variables, data types, structures, and internal tables.',
    objective: 'Declare internal tables in ABAP.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Variables', instruction: 'Navigate to "SE38". In code block, declare variables like DATA: lv_count TYPE i.', summary: 'Declare ABAP variables.', whyNeeded: 'Variables hold calculation buffers.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'ab_vars', expectedOutput: 'SE38' },
      { id: '2', title: 'Data types', instruction: 'Type DATA: lv_name TYPE string in the code editor.', summary: 'Define data types.', whyNeeded: 'Data types define memory structures.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'ab_types', expectedOutput: 'SE38' },
      { id: '3', title: 'Loops', instruction: 'Add LOOP AT lt_data into ls_data... ENDLOOP in code editor.', summary: 'Add loops.', whyNeeded: 'Loops process table rows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'ab_loops', expectedOutput: 'SE38' },
      { id: '4', title: 'Internal tables', instruction: 'Add DATA: lt_orders TYPE TABLE OF vbak in the editor.', summary: 'Declare internal table.', whyNeeded: 'Internal tables buffer database records in RAM.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'ab_tables', expectedOutput: 'SE38' },
      { id: '5', title: 'Structures', instruction: 'Add DATA: ls_order TYPE vbak in code editor.', summary: 'Declare structure.', whyNeeded: 'Structures store single rows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'ab_structures', expectedOutput: 'SE38' }
    ]
  },
  {
    projectId: 'sap-abap-prog',
    environment: 'linux',
    description: 'Learn ABAP coding structure: modularization, function modules, classes, and method exception handling.',
    objective: 'Implement exception handling blocks.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Modularization', instruction: 'Navigate to "SE38" and use form blocks like PERFORM fetch_data.', summary: 'Modularize code.', whyNeeded: 'Modularization avoids redundant copy-pastes.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'ap_mod', expectedOutput: 'SE38' },
      { id: '2', title: 'Function Modules', instruction: 'Type "FUNCTION" in the command bar.', summary: 'Call Function Module.', whyNeeded: 'Function modules package logic.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'ap_func', expectedOutput: 'FUNCTION' },
      { id: '3', title: 'Classes', instruction: 'In editor, declare CLASS zcl_sales DEFINITION.', summary: 'Declare ABAP class.', whyNeeded: 'Classes organize code OO objects.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'ap_class', expectedOutput: 'SE38' },
      { id: '4', title: 'Methods', instruction: 'Add METHODS: get_total in the class declaration.', summary: 'Declare class methods.', whyNeeded: 'Methods execute OO calculations.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'ap_methods', expectedOutput: 'SE38' },
      { id: '5', title: 'Exceptions', instruction: 'Add TRY... CATCH cx_sy_zerodivide in the editor.', summary: 'Catch runtime exception.', whyNeeded: 'Exception catching blocks prevent software crash dumps (ST22).', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'ap_exceptions', expectedOutput: 'SE38' }
    ]
  },
  {
    projectId: 'sap-abap-reports',
    environment: 'linux',
    description: 'Write custom reports: ALV, interactive, and classical data summaries.',
    objective: 'Generate ALV reporting grids.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Classical Reports', instruction: 'Navigate to "SE38". Write WRITE statements to output columns.', summary: 'Format report.', whyNeeded: 'Classical reports generate text outputs.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'rep_classical', expectedOutput: 'SE38' },
      { id: '2', title: 'ALV Reports', instruction: 'In editor, call REUSE_ALV_GRID_DISPLAY.', summary: 'Display ALV grid.', whyNeeded: 'ALV grids provide built-in sorting and Excel export features.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'rep_alv', expectedOutput: 'SE38' },
      { id: '3', title: 'Interactive Reports', instruction: 'Add AT LINE-SELECTION in report code.', summary: 'Design interactive reports.', whyNeeded: 'Interactive reports allow drills by double-clicking lines.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'rep_interactive', expectedOutput: 'SE38' }
    ]
  },
  {
    projectId: 'sap-abap-dict',
    environment: 'linux',
    description: 'Manage Data Dictionary elements: transparent tables, data elements, domains, search helps, and locks.',
    objective: 'Configure search helps in Data Dictionary.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Tables', instruction: 'Type "SE11" in the command bar to open the Data Dictionary.', summary: 'Load SE11.', whyNeeded: 'SE11 manages database tables.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'dic_se11', expectedOutput: 'SE11' },
      { id: '2', title: 'Domains', instruction: 'Type "DOMAINS" in the command bar.', summary: 'Define data domains.', whyNeeded: 'Domains enforce field size and types.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'dic_domains', expectedOutput: 'DOMAINS' },
      { id: '3', title: 'Data Elements', instruction: 'Type "DATA_ELEMENTS" in the command bar.', summary: 'Define data elements.', whyNeeded: 'Data elements provide translation labels.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'dic_elements', expectedOutput: 'DATA_ELEMENTS' },
      { id: '4', title: 'Views', instruction: 'Type "VIEWS" in the command bar.', summary: 'Configure dictionary views.', whyNeeded: 'Views join relational tables.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'dic_views', expectedOutput: 'VIEWS' },
      { id: '5', title: 'Search Helps', instruction: 'Type "SEARCH_HELP" in the command bar.', summary: 'Configure search helps.', whyNeeded: 'Search help powers user F4 lookups.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'dic_search', expectedOutput: 'SEARCH_HELP' },
      { id: '6', title: 'Lock Objects', instruction: 'Type "LOCK_OBJECTS" in the command bar.', summary: 'Define lock objects.', whyNeeded: 'Lock objects prevent multiple users from editing the same row.', pillarConnection: 'Security', commands: [], checkCommand: 'dic_locks', expectedOutput: 'LOCK_OBJECTS' }
    ]
  },
  {
    projectId: 'sap-abap-forms',
    environment: 'linux',
    description: 'Create print outputs: Smart Forms, Adobe Forms, SAPScripts, and driver programs.',
    objective: 'Implement custom Smart Forms layouts.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'Forms', instruction: 'Type "SMARTFORMS" in the command bar to load the forms editor.', summary: 'Load Smart Forms.', whyNeeded: 'Smart Forms design corporate invoices.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sf_smart', expectedOutput: 'SMARTFORMS' },
      { id: '2', title: 'Adobe Forms', instruction: 'Type "SFP" in the command bar.', summary: 'Load Adobe Forms.', whyNeeded: 'Adobe Forms generate PDF printouts.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sf_sfp', expectedOutput: 'SFP' },
      { id: '3', title: 'SAP Scripts', instruction: 'Type "SAPSCRIPT" in the command bar.', summary: 'Load SAPScripts.', whyNeeded: 'SAPScripts are legacy form templates.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sf_script', expectedOutput: 'SAPSCRIPT' },
      { id: '4', title: 'Print programs', instruction: 'Navigate to "SE38". Call SMARTFORM_FUNCTION_MODULE.', summary: 'Write driver program.', whyNeeded: 'Driver programs fetch data and route them to forms.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sf_driver', expectedOutput: 'SE38' }
    ]
  },
  {
    projectId: 'sap-abap-enh',
    environment: 'linux',
    description: 'Implement enhancements: Business Add-Ins (BADI), user exits, customer exits, and enhancement points.',
    objective: 'Implement BADI enhancement methods.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'BADI', instruction: 'Type "SE19" in the command bar to load BADI implementations.', summary: 'Load SE19.', whyNeeded: 'BADI implements custom checks without editing SAP core code.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'en_se19', expectedOutput: 'SE19' },
      { id: '2', title: 'User Exits', instruction: 'Navigate to "SE38". Modify standard exit subroutine.', summary: 'Apply user exit.', whyNeeded: 'User exits modify sales order logic.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'en_user_exit', expectedOutput: 'SE38' },
      { id: '3', title: 'Customer Exits', instruction: 'Type "SMOD" in the command bar.', summary: 'Load SMOD.', whyNeeded: 'Customer exits add hooks for custom fields.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'en_smod', expectedOutput: 'SMOD' },
      { id: '4', title: 'Enhancement Framework', instruction: 'Type "ENHANCEMENT" in the command bar.', summary: 'Verify enhancement points.', whyNeeded: 'Enhancements inject code at runtime.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'en_framework', expectedOutput: 'ENHANCEMENT' }
    ]
  },

  // LEVEL 6: SAP Integration
  {
    projectId: 'sap-integration-api',
    environment: 'linux',
    description: 'Build APIs: OData services, REST APIs, SOAP services, RFC integrations, and BAPIs.',
    objective: 'Examine BAPI interface parameters.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'OData', instruction: 'Type "SEGW" in the command bar to open Gateway Service Builder.', summary: 'Load SEGW.', whyNeeded: 'OData fuels Fiori Launchpad apps.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'api_segw', expectedOutput: 'SEGW' },
      { id: '2', title: 'REST', instruction: 'Type "REST_API" in the command bar.', summary: 'Test REST API.', whyNeeded: 'REST routes JSON packets to external servers.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'api_rest', expectedOutput: 'REST_API' },
      { id: '3', title: 'SOAP', instruction: 'Type "SOAP_API" in the command bar.', summary: 'Test SOAP API.', whyNeeded: 'SOAP wraps XML web services.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'api_soap', expectedOutput: 'SOAP_API' },
      { id: '4', title: 'RFC', instruction: 'Type "SM59" in the command bar.', summary: 'Load SM59.', whyNeeded: 'SM59 manages RFC connections to remote servers.', pillarConnection: 'Security', commands: [], checkCommand: 'api_sm59', expectedOutput: 'SM59' },
      { id: '5', title: 'BAPI', instruction: 'Type "BAPI_TCODE" in the command bar.', summary: 'Test BAPI.', whyNeeded: 'BAPIs expose core business processes outside SAP.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'api_bapi', expectedOutput: 'BAPI_TCODE' }
    ]
  },
  {
    projectId: 'sap-integration-suite',
    environment: 'linux',
    description: 'Learn SAP Integration Suite: Cloud Integration flows, API management, and Event Mesh.',
    objective: 'Configure Cloud Integration parameters.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Cloud Integration', instruction: 'Type "CLOUD_INT" in the command bar.', summary: 'Configure CPI flow.', whyNeeded: 'CPI routes integration flows in cloud environments.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'int_cpi', expectedOutput: 'CLOUD_INT' },
      { id: '2', title: 'API Management', instruction: 'Type "API_MGMT" in the command bar.', summary: 'Deploy API proxy.', whyNeeded: 'API proxies authenticate traffic.', pillarConnection: 'Security', commands: [], checkCommand: 'int_mgmt', expectedOutput: 'API_MGMT' },
      { id: '3', title: 'Event Mesh', instruction: 'Type "EVENT_MESH" in the command bar.', summary: 'Verify Event Mesh queues.', whyNeeded: 'Event Mesh handles asynchronous notifications.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'int_mesh', expectedOutput: 'EVENT_MESH' },
      { id: '4', title: 'Open Connectors', instruction: 'Type "CONNECTORS" in the command bar.', summary: 'Check open connectors.', whyNeeded: 'Connectors route endpoints to third-party databases.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'int_connectors', expectedOutput: 'CONNECTORS' }
    ]
  },
  {
    projectId: 'sap-integration-po',
    environment: 'linux',
    description: 'Configure Process Orchestration (PI/PO): message mappings, interface designs, and monitoring.',
    objective: 'Verify PI/PO interface mappings.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Message Mapping', instruction: 'Type "MAPPING" in the command bar.', summary: 'Map message schemas.', whyNeeded: 'Mappings translate source XML elements to target schemas.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'po_mapping', expectedOutput: 'MAPPING' },
      { id: '2', title: 'Interface Design', instruction: 'Type "INTERFACE" in the command bar.', summary: 'Design integration interface.', whyNeeded: 'Interfaces compile service descriptions.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'po_interface', expectedOutput: 'INTERFACE' },
      { id: '3', title: 'Integration Directory', instruction: 'Type "DIRECTORY" in the command bar.', summary: 'Inspect Directory.', whyNeeded: 'Directory holds active communication ports.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'po_directory', expectedOutput: 'DIRECTORY' },
      { id: '4', title: 'Monitoring', instruction: 'Type "PO_MONITOR" in the command bar.', summary: 'Launch PO monitor.', whyNeeded: 'Monitor registers failures in integration runs.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'po_monitor', expectedOutput: 'PO_MONITOR' }
    ]
  },

  // LEVEL 7: SAP Analytics
  {
    projectId: 'sap-analytics-sac',
    environment: 'linux',
    description: 'Build reports using SAP Analytics Cloud (SAC): dashboards, stories, planning, and forecasting.',
    objective: 'Design interactive SAC dashboards.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Dashboards', instruction: 'Type "SAC_DASHBOARD" in the command bar.', summary: 'Assemble SAC dashboard.', whyNeeded: 'Dashboards display sales KPIs.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sac_dash', expectedOutput: 'SAC_DASHBOARD' },
      { id: '2', title: 'Stories', instruction: 'Type "SAC_STORIES" in the command bar.', summary: 'Compile stories.', whyNeeded: 'Stories link database charts with comments.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sac_stories', expectedOutput: 'SAC_STORIES' },
      { id: '3', title: 'Planning', instruction: 'Type "SAC_PLANNING" in the command bar.', summary: 'Build planning grid.', whyNeeded: 'Planning inputs help set next year budget limits.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sac_planning', expectedOutput: 'SAC_PLANNING' },
      { id: '4', title: 'Forecasting', instruction: 'Type "SAC_FORECAST" in the command bar.', summary: 'Run predictive model.', whyNeeded: 'Forecasting uses historical sales coordinates to predict growth.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sac_forecast', expectedOutput: 'SAC_FORECAST' }
    ]
  },
  {
    projectId: 'sap-analytics-bw',
    environment: 'linux',
    description: 'Learn SAP BW/4HANA warehousing: ETL flows, InfoProviders, and queries.',
    objective: 'Verify InfoProviders data loads.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Data Warehousing', instruction: 'Type "WAREHOUSE" in the command bar.', summary: 'Examine warehousing schemas.', whyNeeded: 'Warehousing groups corporate data layers.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'bw_warehouse', expectedOutput: 'WAREHOUSE' },
      { id: '2', title: 'ETL', instruction: 'Type "ETL_LOAD" in the command bar.', summary: 'Verify ETL load status.', whyNeeded: 'ETL pulls transactional logs.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'bw_etl', expectedOutput: 'ETL_LOAD' },
      { id: '3', title: 'InfoProviders', instruction: 'Type "INFOPROVIDERS" in the command bar.', summary: 'Inspect InfoProviders.', whyNeeded: 'InfoProviders store database rows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'bw_providers', expectedOutput: 'INFOPROVIDERS' },
      { id: '4', title: 'Queries', instruction: 'Type "BW_QUERIES" in the command bar.', summary: 'Execute query analysis.', whyNeeded: 'Queries feed business report views.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'bw_queries', expectedOutput: 'BW_QUERIES' }
    ]
  },

  // LEVEL 8: SAP Cloud
  {
    projectId: 'sap-cloud-btp',
    environment: 'linux',
    description: 'Configure SAP BTP subaccounts, Cloud Foundry, destinations, and Kyma.',
    objective: 'Examine SAP BTP destination links.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Global Accounts', instruction: 'Type "GLOBAL_ACCT" in the command bar.', summary: 'Trace BTP account.', whyNeeded: 'Global accounts regulate enterprise licenses.', pillarConnection: 'Security', commands: [], checkCommand: 'btp_global', expectedOutput: 'GLOBAL_ACCT' },
      { id: '2', title: 'Subaccounts', instruction: 'Type "SUBACCOUNTS" in the command bar.', summary: 'Trace subaccount.', whyNeeded: 'Subaccounts isolate development runtimes.', pillarConnection: 'Security', commands: [], checkCommand: 'btp_subacct', expectedOutput: 'SUBACCOUNTS' },
      { id: '3', title: 'Cloud Foundry', instruction: 'Type "CL_FOUNDRY" in the command bar.', summary: 'Inspect Cloud Foundry.', whyNeeded: 'Cloud Foundry hosts custom Java/Node applets.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'btp_foundry', expectedOutput: 'CL_FOUNDRY' },
      { id: '4', title: 'Kyma', instruction: 'Type "KYMA" in the command bar.', summary: 'Inspect Kyma services.', whyNeeded: 'Kyma provides Kubernetes runtimes.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'btp_kyma', expectedOutput: 'KYMA' },
      { id: '5', title: 'Destinations', instruction: 'Type "DESTINATIONS" in the command bar.', summary: 'Examine destinations table.', whyNeeded: 'Destinations store credentials to connect cloud resources.', pillarConnection: 'Security', commands: [], checkCommand: 'btp_destinations', expectedOutput: 'DESTINATIONS' }
    ]
  },
  {
    projectId: 'sap-cloud-ai',
    environment: 'linux',
    description: 'Examine SAP AI features: AI Core, AI Launchpad, and Generative AI Hub APIs.',
    objective: 'Test Generative AI Hub endpoints.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'AI Core', instruction: 'Type "AI_CORE" in the command bar.', summary: 'Inspect AI Core.', whyNeeded: 'AI Core runs ML training pipelines.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'ai_core', expectedOutput: 'AI_CORE' },
      { id: '2', title: 'AI Launchpad', instruction: 'Type "AI_LAUNCHPAD" in the command bar.', summary: 'Launch AI dashboard.', whyNeeded: 'Launchpad monitors ML models.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'ai_launchpad', expectedOutput: 'AI_LAUNCHPAD' },
      { id: '3', title: 'Generative AI Hub', instruction: 'Type "GENAI_HUB" in the command bar.', summary: 'Query LLM endpoint.', whyNeeded: 'AI Hub bridges enterprise datasets with GPT/Gemini models.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'ai_hub', expectedOutput: 'GENAI_HUB' },
      { id: '4', title: 'AI APIs', instruction: 'Type "AI_APIs" in the command bar.', summary: 'Test AI API endpoints.', whyNeeded: 'AI APIs return predictions.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'ai_apis', expectedOutput: 'AI_APIs' }
    ]
  },
  {
    projectId: 'sap-cloud-auto',
    environment: 'linux',
    description: 'Create automations using SAP Build: Build Apps, workflows, and process automation.',
    objective: 'Configure automated workflow steps.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Build Apps', instruction: 'Type "BUILD_APPS" in the command bar.', summary: 'Launch Build Apps.', whyNeeded: 'Build Apps compiles low-code interfaces.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'auto_apps', expectedOutput: 'BUILD_APPS' },
      { id: '2', title: 'Build Process Automation', instruction: 'Type "PROCESS_AUTO" in the command bar.', summary: 'Launch Process Automation.', whyNeeded: 'Process Automation replaces manual invoice entry with RPA bots.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'auto_process', expectedOutput: 'PROCESS_AUTO' },
      { id: '3', title: 'Workflow', instruction: 'Type "WORKFLOW" in the command bar.', summary: 'Design process workflow.', whyNeeded: 'Workflows route manager approvals.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'auto_workflow', expectedOutput: 'WORKFLOW' },
      { id: '4', title: 'Forms', instruction: 'Type "AUTO_FORMS" in the command bar.', summary: 'Design input forms.', whyNeeded: 'Forms capture operator details.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'auto_forms', expectedOutput: 'AUTO_FORMS' }
    ]
  },

  // LEVEL 9: DevOps for SAP
  {
    projectId: 'sap-devops',
    environment: 'linux',
    description: 'Build CI/CD pipelines for SAP: Git integration, gCTS, Jenkins, and GitHub Actions.',
    objective: 'Configure Jenkins CTS transport integrations.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Git integration', instruction: 'Type "GIT_INTEG" in the command bar.', summary: 'Configure Git sync.', whyNeeded: 'Git tracks version changes on ABAP classes.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'dop_git', expectedOutput: 'GIT_INTEG' },
      { id: '2', title: 'CI/CD', instruction: 'Type "CICD_FLOW" in the command bar.', summary: 'Verify CI/CD pipeline.', whyNeeded: 'CI/CD automates syntax checks on commits.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'dop_cicd', expectedOutput: 'CICD_FLOW' },
      { id: '3', title: 'Transport automation', instruction: 'Type "TRANS_AUTO" in the command bar.', summary: 'Automate transport queue.', whyNeeded: 'Automation imports transports immediately after compile.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'dop_trans', expectedOutput: 'TRANS_AUTO' },
      { id: '4', title: 'CTS+', instruction: 'Type "CTS_PLUS" in the command bar.', summary: 'Configure CTS+.', whyNeeded: 'CTS+ manages non-ABAP transport objects.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'dop_cts', expectedOutput: 'CTS_PLUS' },
      { id: '5', title: 'gCTS', instruction: 'Type "GCTS" in the command bar.', summary: 'Configure gCTS.', whyNeeded: 'gCTS implements Git-based transport releases.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'dop_gcts', expectedOutput: 'GCTS' },
      { id: '6', title: 'Jenkins', instruction: 'Type "JENKINS" in the command bar.', summary: 'Verify Jenkins job status.', whyNeeded: 'Jenkins automates transport imports.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'dop_jenkins', expectedOutput: 'JENKINS' },
      { id: '7', title: 'Azure DevOps', instruction: 'Type "AZURE_DEVOPS" in the command bar.', summary: 'Verify Azure DevOps setup.', whyNeeded: 'Azure DevOps runs regression tests.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'dop_azure', expectedOutput: 'AZURE_DEVOPS' },
      { id: '8', title: 'GitHub Actions', instruction: 'Type "GITHUB_ACTIONS" in the command bar.', summary: 'Verify Action flow.', whyNeeded: 'Actions trigger Fiori unit tests.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'dop_github', expectedOutput: 'GITHUB_ACTIONS' }
    ]
  },

  // LEVEL 10: Enterprise SAP
  {
    projectId: 'sap-enterprise-infra',
    environment: 'linux',
    description: 'Configure high availability, disaster recovery, performance tuning, and security hardening.',
    objective: 'Implement high availability configurations.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'High Availability', instruction: 'Type "HIGH_AVAIL" in the command bar.', summary: 'Configure active failover.', whyNeeded: 'High availability avoids downtime when app servers crash.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'ent_ha', expectedOutput: 'HIGH_AVAIL' },
      { id: '2', title: 'Disaster Recovery', instruction: 'Type "DISASTER_REC" in the command bar.', summary: 'Configure disaster recovery.', whyNeeded: 'Disaster recovery replicates data to regional databases.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'ent_dr', expectedOutput: 'DISASTER_REC' },
      { id: '3', title: 'Performance tuning', instruction: 'Type "PERF_TUNING" in the command bar.', summary: 'Verify memory tuning parameters.', whyNeeded: 'Tuning optimizes heap limits.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'ent_tuning', expectedOutput: 'PERF_TUNING' },
      { id: '4', title: 'Sizing', instruction: 'Type "SIZING" in the command bar.', summary: 'Check hardware sizing.', whyNeeded: 'Sizing calculates RAM needs for HANA tables.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'ent_sizing', expectedOutput: 'SIZING' },
      { id: '5', title: 'Security hardening', instruction: 'Type "HARDENING" in the command bar.', summary: 'Lock down system parameters.', whyNeeded: 'Hardening blocks unauthorized client access.', pillarConnection: 'Security', commands: [], checkCommand: 'ent_hardening', expectedOutput: 'HARDENING' }
    ]
  },
  {
    projectId: 'sap-enterprise-cloud',
    environment: 'linux',
    description: 'Configure SAP on cloud: AWS, Azure, and Google Cloud hybrid deployments.',
    objective: 'Trace hybrid deployment networks.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'SAP on AWS', instruction: 'Type "SAP_AWS" in the command bar.', summary: 'Inspect AWS node.', whyNeeded: 'AWS hosts S/4HANA instances.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'cld_aws', expectedOutput: 'SAP_AWS' },
      { id: '2', title: 'SAP on Azure', instruction: 'Type "SAP_AZURE" in the command bar.', summary: 'Inspect Azure node.', whyNeeded: 'Azure integrates Microsoft data feeds.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'cld_azure', expectedOutput: 'SAP_AZURE' },
      { id: '3', title: 'SAP on Google Cloud', instruction: 'Type "SAP_GCP" in the command bar.', summary: 'Inspect GCP node.', whyNeeded: 'Google Cloud optimizes memory footprints.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'cld_gcp', expectedOutput: 'SAP_GCP' },
      { id: '4', title: 'Hybrid deployments', instruction: 'Type "HYBRID" in the command bar.', summary: 'Check hybrid config.', whyNeeded: 'Hybrids link on-prem databases with cloud nodes.', pillarConnection: 'Security', commands: [], checkCommand: 'cld_hybrid', expectedOutput: 'HYBRID' }
    ]
  },
  {
    projectId: 'sap-enterprise-migrations',
    environment: 'linux',
    description: 'Learn migration strategies: logging configurations, automation systems, and database migrations.',
    objective: 'Complete database migrations.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Monitoring', instruction: 'Type "MIG_MONITOR" in the command bar.', summary: 'Monitor migrations.', whyNeeded: 'Monitoring prevents data losses.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'mig_monitor', expectedOutput: 'MIG_MONITOR' },
      { id: '2', title: 'Logging', instruction: 'Type "MIG_LOGGING" in the command bar.', summary: 'Check migration logs.', whyNeeded: 'Logs trace migration errors.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'mig_logging', expectedOutput: 'MIG_LOGGING' },
      { id: '3', title: 'Automation', instruction: 'Type "MIG_AUTO" in the command bar.', summary: 'Automate migrations.', whyNeeded: 'Automation scripts copy datasets systematically.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'mig_auto', expectedOutput: 'MIG_AUTO' },
      { id: '4', title: 'Cloud migrations', instruction: 'Type "CLOUD_MIG" in the command bar.', summary: 'Test migration endpoints.', whyNeeded: 'Cloud migrations transfer legacy files to VMs.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'mig_cloud', expectedOutput: 'CLOUD_MIG' }
    ]
  },

  // LEVEL 11: Expert Projects (Capstones)
  {
    projectId: 'sap-project-p2p',
    environment: 'linux',
    description: 'End-to-End Procure-to-Pay (P2P): Vendor setup, Purchase Requisition, Purchase Order, Goods Receipt, Invoice Verification, and Payment.',
    objective: 'Execute end-to-end P2P cycle.',
    missionNumber: 1, totalMissions: 1, xpReward: 400,
    steps: [
      { id: '1', title: 'Vendor setup', instruction: 'Type "VENDORS" in the command bar to check active vendor settings.', summary: 'Check vendor parameters.', whyNeeded: 'Vendors supply materials.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_p2p_vendor', expectedOutput: 'VENDORS' },
      { id: '2', title: 'Purchase requisition', instruction: 'Type "PURCH_REQ" in the command bar.', summary: 'Post purchase requisition.', whyNeeded: 'Requisitions initiate procurement loops.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_p2p_req', expectedOutput: 'PURCH_REQ' },
      { id: '3', title: 'Purchase order', instruction: 'Navigate to "ME21N". Under Vendor field, type "VEND-01" and under PurchOrg field, type "1000". Click Save.', summary: 'Create purchase order.', whyNeeded: 'Purchase orders legalize vendor acquisitions.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_p2p_po', expectedOutput: 'ME21N' },
      { id: '4', title: 'Goods receipt', instruction: 'Type "GOODS_REC" in the command bar to receive stock.', summary: 'Log goods receipt.', whyNeeded: 'Goods receipt updates inventory.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_p2p_receipt', expectedOutput: 'GOODS_REC' },
      { id: '5', title: 'Invoice verification', instruction: 'Type "INV_VERIF" in the command bar.', summary: 'Verify vendor bill.', whyNeeded: 'Verification checks item counts.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_p2p_verif', expectedOutput: 'INV_VERIF' },
      { id: '6', title: 'Payment', instruction: 'Type "PAYMENT" in the command bar.', summary: 'Settle vendor bill.', whyNeeded: 'Settle vendor bill to close the P2P loop.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_p2p_payment', expectedOutput: 'PAYMENT' }
    ]
  },
  {
    projectId: 'sap-project-o2c',
    environment: 'linux',
    description: 'Order-to-Cash (O2C): Customer setup, Sales Order, Delivery, Billing, Payment, and Reporting.',
    objective: 'Execute end-to-end O2C sales pipeline.',
    missionNumber: 1, totalMissions: 1, xpReward: 400,
    steps: [
      { id: '1', title: 'Customer setup', instruction: 'Type "CUST_MAST" in the command bar.', summary: 'Verify customer.', whyNeeded: 'Customers purchase products.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_o2c_cust', expectedOutput: 'CUST_MAST' },
      { id: '2', title: 'Sales order', instruction: 'Navigate to "VA01". In Sold-To field type "100240" and in Material field type "MAT-01". Click save.', summary: 'Post sales order.', whyNeeded: 'Orders queue customer commitments.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_o2c_order', expectedOutput: 'VA01' },
      { id: '3', title: 'Delivery', instruction: 'Type "DELIVERY" in the command bar.', summary: 'Schedule delivery.', whyNeeded: 'Delivery triggers pick lists.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_o2c_delivery', expectedOutput: 'DELIVERY' },
      { id: '4', title: 'Billing', instruction: 'Type "BILLING" in the command bar.', summary: 'Invoice customer.', whyNeeded: 'Invoicing bills customer.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_o2c_billing', expectedOutput: 'BILLING' },
      { id: '5', title: 'Payment', instruction: 'Type "PAYMENT" in the command bar.', summary: 'Log payment receipt.', whyNeeded: 'Payments reconcile sales receipts.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_o2c_payment', expectedOutput: 'PAYMENT' },
      { id: '6', title: 'Reporting', instruction: 'Type "FI_REPORTS" in the command bar.', summary: 'Check financial report.', whyNeeded: 'Reports trace account balances.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_o2c_report', expectedOutput: 'FI_REPORTS' }
    ]
  },
  {
    projectId: 'sap-project-r2r',
    environment: 'linux',
    description: 'Record-to-Report (R2R): General Ledger, closing, financial statements, and profitability analysis.',
    objective: 'Reconcile ledger accounts.',
    missionNumber: 1, totalMissions: 1, xpReward: 400,
    steps: [
      { id: '1', title: 'General ledger', instruction: 'Navigate to "FB50" to enter ledger entries.', summary: 'Verify G/L ledger.', whyNeeded: 'Ledgers organize accounting books.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_r2r_gl', expectedOutput: 'FB50' },
      { id: '2', title: 'Closing', instruction: 'Type "CLOSING" in the command bar.', summary: 'Execute month closing.', whyNeeded: 'Closing locks monthly accounts.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_r2r_closing', expectedOutput: 'CLOSING' },
      { id: '3', title: 'Financial statements', instruction: 'Type "FI_REPORTS" in the command bar.', summary: 'Check trial balance.', whyNeeded: 'Trial balances summarize assets.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_r2r_statements', expectedOutput: 'FI_REPORTS' },
      { id: '4', title: 'Profitability analysis', instruction: 'Type "CO_PA" in the command bar.', summary: 'Verify margin analysis.', whyNeeded: 'Analyses check segment profits.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_r2r_pa', expectedOutput: 'CO_PA' }
    ]
  },
  {
    projectId: 'sap-project-h2r',
    environment: 'linux',
    description: 'Hire-to-Retire (H2R): Employee onboarding, payroll calculations, leave tracking, performance reviews, and separation.',
    objective: 'Complete payroll allocations.',
    missionNumber: 1, totalMissions: 1, xpReward: 400,
    steps: [
      { id: '1', title: 'Employee onboarding', instruction: 'Type "EMP_RECORDS" in the command bar.', summary: 'Create employee record.', whyNeeded: 'Onboarding logs new hire details.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_h2r_hire', expectedOutput: 'EMP_RECORDS' },
      { id: '2', title: 'Payroll', instruction: 'Type "PAYROLL" in the command bar.', summary: 'Calculate employee payroll.', whyNeeded: 'Payroll calculations distribute salaries.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_h2r_payroll', expectedOutput: 'PAYROLL' },
      { id: '3', title: 'Leave', instruction: 'Type "TIME_MGMT" in the command bar.', summary: 'Check leave records.', whyNeeded: 'Leave tracking records holiday bounds.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_h2r_leave', expectedOutput: 'TIME_MGMT' },
      { id: '4', title: 'Performance', instruction: 'Type "PERF" in the command bar.', summary: 'Check performance scores.', whyNeeded: 'Reviews determine salary promotions.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_h2r_perf', expectedOutput: 'PERF' },
      { id: '5', title: 'Separation', instruction: 'Type "SEPARATION" in the command bar.', summary: 'Process exit separation.', whyNeeded: 'Separation terminates active employee credentials.', pillarConnection: 'Security', commands: [], checkCommand: 'cap_h2r_separation', expectedOutput: 'SEPARATION' }
    ]
  },
  {
    projectId: 'sap-project-p2p-mfg',
    environment: 'linux',
    description: 'Plan-to-Produce (P2P Manufacturing): Material planning, production orders, inventory logs, quality checks, and shipping.',
    objective: 'Complete shop floor controls.',
    missionNumber: 1, totalMissions: 1, xpReward: 400,
    steps: [
      { id: '1', title: 'Material planning', instruction: 'Type "MRP" in the command bar to calculate materials.', summary: 'Verify material planning.', whyNeeded: 'Planning checks stock requirements.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_mfg_plan', expectedOutput: 'MRP' },
      { id: '2', title: 'Production', instruction: 'Type "PROD_ORDER" in the command bar.', summary: 'Post production order.', whyNeeded: 'Orders build factory queues.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_mfg_prod', expectedOutput: 'PROD_ORDER' },
      { id: '3', title: 'Inventory', instruction: 'Type "GOODS_REC" in the command bar.', summary: 'Log goods receipt.', whyNeeded: 'Receipts count incoming materials.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_mfg_inv', expectedOutput: 'GOODS_REC' },
      { id: '4', title: 'Quality', instruction: 'Type "USAGE_DEC" in the command bar.', summary: 'Release inspected stock.', whyNeeded: 'Quality usage decisions verify conformance.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_mfg_quality', expectedOutput: 'USAGE_DEC' },
      { id: '5', title: 'Shipping', instruction: 'Type "SHIPPING" in the command bar.', summary: 'Approve outbound shipment.', whyNeeded: 'Shipping completes factory delivery loops.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cap_mfg_shipping', expectedOutput: 'SHIPPING' }
    ]
  }
];
