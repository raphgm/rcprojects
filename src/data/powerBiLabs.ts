import { LabContent } from '../types/content';

export const powerBiLabs: LabContent[] = [
  // LEVEL 1: Power BI Foundations
  {
    projectId: 'pbi-intro',
    environment: 'linux',
    description: 'Learn the Power BI ecosystem, install Desktop, connect semantic layers, and publish your first business intelligence report.',
    objective: 'Install Power BI Desktop and publish report.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Install Power BI Desktop', instruction: 'Enter "INSTALL_PBI" in the data source connection parameter input.', summary: 'Verify desktop client.', whyNeeded: 'Desktop serves as the primary authoring workspace.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'pbi_install', expectedOutput: 'INSTALL_PBI' },
      { id: '2', title: 'Create your first report', instruction: 'Switch view mode to "report" by clicking the top sidebar report canvas icon.', summary: 'Activate canvas.', whyNeeded: 'The canvas hosts all interactive visualizations.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_view_report', expectedOutput: 'report' },
      { id: '3', title: 'Explore the interface', instruction: 'In data source connection parameter, type "EXPLORE" and click Connect Connector.', summary: 'Validate source connector.', whyNeeded: 'Verifying data source parameters maps client schemas.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_connect', expectedOutput: 'EXPLORE' },
      { id: '4', title: 'Publish your first report', instruction: 'Click "Publish Workspace" in the top bar to upload the semantic model.', summary: 'Publish semantic model.', whyNeeded: 'Publishing shares dashboards with executive users.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'pbi_publish', expectedOutput: 'true' }
    ]
  },
  {
    projectId: 'pbi-desktop',
    environment: 'linux',
    description: 'Master Power BI Desktop views: Report view, Data view, Model view, Fields panes, and templates.',
    objective: 'Manage templates and model views.',
    missionNumber: 1, totalMissions: 1, xpReward: 150,
    steps: [
      { id: '1', title: 'Create a report', instruction: 'Switch to "report" view mode.', summary: 'Open canvas.', whyNeeded: 'Report canvas coordinates chart blocks.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_view_report', expectedOutput: 'report' },
      { id: '2', title: 'Save templates', instruction: 'Enter "TEMPLATE.PBIT" in the data source connection parameter input.', summary: 'Define template path.', whyNeeded: 'Templates capture layout themes and queries without saving data.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'pbi_template', expectedOutput: 'TEMPLATE.PBIT' },
      { id: '3', title: 'Import datasets', instruction: 'Switch to "data" view mode.', summary: 'Open data view.', whyNeeded: 'Data view previews ingested table rows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_view_data', expectedOutput: 'data' },
      { id: '4', title: 'Configure options', instruction: 'Switch to "model" view mode.', summary: 'Open relationships model.', whyNeeded: 'Model view manages logical connections.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_view_model', expectedOutput: 'model' }
    ]
  },
  {
    projectId: 'pbi-getdata',
    environment: 'linux',
    description: 'Connect to multiple data sources: Excel, CSV, SQL databases, SharePoint, and JSON API web URLs.',
    objective: 'Connect to external data sources.',
    missionNumber: 1, totalMissions: 1, xpReward: 150,
    steps: [
      { id: '1', title: 'Connect to multiple data sources', instruction: 'In data source connection parameter, type "SQL_SERVER" and click Connect Connector.', summary: 'Connect database.', whyNeeded: 'Ingestion gathers distributed corporate metrics.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_connect', expectedOutput: 'SQL_SERVER' },
      { id: '2', title: 'Refresh data', instruction: 'Click "Refresh Model" in the top header ribbon.', summary: 'Trigger model sync.', whyNeeded: 'Refreshes load updated rows into memory.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'pbi_refresh', expectedOutput: 'true' },
      { id: '3', title: 'Resolve connection errors', instruction: 'Type "RESOLVED" in the data source connection parameter input.', summary: 'Fix connector error.', whyNeeded: 'Invalid parameters block scheduled refreshes.', pillarConnection: 'Security', commands: [], checkCommand: 'pbi_connect', expectedOutput: 'RESOLVED' }
    ]
  },

  // LEVEL 2: Power Query
  {
    projectId: 'pbi-pq-fund',
    environment: 'linux',
    description: 'Learn Query Editor, Applied Steps, and M language to clean column metrics.',
    objective: 'Apply basic Power Query ETL transforms.',
    missionNumber: 1, totalMissions: 1, xpReward: 150,
    steps: [
      { id: '1', title: 'Clean messy datasets', instruction: 'Switch to "data" view mode. In Query Transformation Actions, type "RENAME_COLUMNS" and click Apply Step.', summary: 'Rename columns.', whyNeeded: 'Renaming columns maps columns to schema naming standards.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_etl', expectedOutput: 'RENAME_COLUMNS' },
      { id: '2', title: 'Build reusable queries', instruction: 'In Query Transformation Actions, type "REMOVE_COLUMNS" and click Apply Step.', summary: 'Clean dataset rows.', whyNeeded: 'Removing columns reduces memory footprint.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_etl', expectedOutput: 'REMOVE_COLUMNS' }
    ]
  },
  {
    projectId: 'pbi-clean',
    environment: 'linux',
    description: 'Data cleaning transformations: handle nulls, replace values, pivot, unpivot, and transpose sales sheets.',
    objective: 'Unpivot columns in Power Query.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Prepare sales data', instruction: 'Switch to "data" view mode. In Query Transformation Actions, type "UNPIVOT" and click Apply Step.', summary: 'Apply unpivot.', whyNeeded: 'Unpivoting formats cross-tab rows into normalized column lists.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_etl', expectedOutput: 'UNPIVOT' },
      { id: '2', title: 'Clean HR datasets', instruction: 'In Query Transformation Actions, type "REPLACE_NULLS" and click Apply Step.', summary: 'Filter nulls.', whyNeeded: 'Null handling avoids DAX calculation errors.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_etl', expectedOutput: 'REPLACE_NULLS' }
    ]
  },
  {
    projectId: 'pbi-pq-adv',
    environment: 'linux',
    description: 'Configure advanced ETL: functions, parameters, merge, append queries, and custom conditional columns.',
    objective: 'Build custom ETL pipelines.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Build reusable ETL pipelines', instruction: 'Switch to "data" view mode. In Query Transformation Actions, type "MERGE_QUERIES" and click Apply Step.', summary: 'Merge datasets.', whyNeeded: 'Merging queries joins separate lookup tables together.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_etl', expectedOutput: 'MERGE_QUERIES' }
    ]
  },

  // LEVEL 3: Data Modeling
  {
    projectId: 'pbi-modeling',
    environment: 'linux',
    description: 'Design Star Schema models: configure Fact tables, Dimension tables, cardinality, and relationships.',
    objective: 'Configure table relationships.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Build a proper star schema', instruction: 'Switch to "model" view mode. In Join Relationship Constraints input, type "1-to-many" and click Define Relationship.', summary: 'Define 1-to-many relationship.', whyNeeded: 'Relationships filter fact table rows based on dimensions.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_relationship', expectedOutput: '1-to-many' }
    ]
  },
  {
    projectId: 'pbi-modeling-adv',
    environment: 'linux',
    description: 'Advanced modeling: configure many-to-many relationships, composite models, and calculation groups.',
    objective: 'Optimize semantic model card relations.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'Optimize enterprise models', instruction: 'Switch to "model" view mode. In Join Relationship Constraints, type "many-to-many" and click Define Relationship.', summary: 'Validate many-to-many relation.', whyNeeded: 'Many-to-many relationships bypass strict primary key restrictions.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_relationship', expectedOutput: 'many-to-many' }
    ]
  },

  // LEVEL 4: DAX
  {
    projectId: 'pbi-dax-fund',
    environment: 'linux',
    description: 'Learn DAX syntax: declare calculated columns, measures, and variables in the formula bar.',
    objective: 'Declare calculated measures.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'Build KPIs', instruction: 'In the DAX formula input, type "Total Sales = SUM(Sales[Amount])" and click Apply.', summary: 'Verify DAX syntax.', whyNeeded: 'Measures compute dynamic aggregates on the fly.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_dax', expectedOutput: 'Total Sales = SUM(Sales[Amount])' }
    ]
  },
  {
    projectId: 'pbi-dax-funcs',
    environment: 'linux',
    description: 'Write business logic using standard DAX functions: SUM, SWITCH, AVERAGE, and DATE comparisons.',
    objective: 'Implement conditional SWITCH logic.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Create business metrics', instruction: 'In the DAX formula input, type "Status = SWITCH(Sales[Status], 1, \"Active\")" and click Apply.', summary: 'Apply SWITCH function.', whyNeeded: 'SWITCH is an optimized conditional router.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_dax', expectedOutput: 'Status = SWITCH(Sales[Status], 1, "Active")' }
    ]
  },
  {
    projectId: 'pbi-dax-adv',
    environment: 'linux',
    description: 'Master advanced DAX filters: CALCULATE, FILTER, ALL, ALLEXCEPT, and selected values.',
    objective: 'Modify filter context using CALCULATE.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Dynamic reporting', instruction: 'In the DAX formula input, type "All Sales = CALCULATE(SUM(Sales[Amount]), ALL(Products))" and click Apply.', summary: 'Apply CALCULATE filter override.', whyNeeded: 'CALCULATE shifts the filter context active on the report.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_dax', expectedOutput: 'All Sales = CALCULATE(SUM(Sales[Amount]), ALL(Products))' }
    ]
  },
  {
    projectId: 'pbi-dax-time',
    environment: 'linux',
    description: 'Write time intelligence metrics: YTD, MTD, same period last year, and rolling averages.',
    objective: 'Compute Year-To-Date (YTD) summaries.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'Sales dashboards', instruction: 'In the DAX formula input, type "Sales YTD = TOTALYTD(SUM(Sales[Amount]), Calendar[Date])" and click Apply.', summary: 'Apply TOTALYTD function.', whyNeeded: 'TOTALYTD computes cumulative sums from January 1st.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_dax', expectedOutput: 'Sales YTD = TOTALYTD(SUM(Sales[Amount]), Calendar[Date])' }
    ]
  },

  // LEVEL 5: Visualization
  {
    projectId: 'pbi-visuals',
    environment: 'linux',
    description: 'Assemble executive dashboards with standard visuals: tables, matrices, line graphs, and column grids.',
    objective: 'Design executive dashboard pages.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Executive dashboard', instruction: 'Switch to "report" view mode. In the data source connection parameter, type "EXEC_DASHBOARD" and click Connect.', summary: 'Assemble report tiles.', whyNeeded: 'Report views layout chart blocks.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_connect', expectedOutput: 'EXEC_DASHBOARD' }
    ]
  },
  {
    projectId: 'pbi-visuals-adv',
    environment: 'linux',
    description: 'Create analytics visuals: waterfall charts, key influencers, decomposition trees, and maps.',
    objective: 'Deploy decomposition analytics trees.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Executive analytics', instruction: 'In the data source connection parameter, type "DECOMP_TREE" and click Connect.', summary: 'Examine decomposition tree.', whyNeeded: 'Decomposition trees split metrics across segments.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_connect', expectedOutput: 'DECOMP_TREE' }
    ]
  },
  {
    projectId: 'pbi-interactive',
    environment: 'linux',
    description: 'Build interactive reports: bookmarks, buttons, drillthrough paths, tooltips, and dynamic titles.',
    objective: 'Configure report bookmarks.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Interactive dashboards', instruction: 'In the data source connection parameter, type "BOOKMARKS" and click Connect.', summary: 'Save bookmarks layout.', whyNeeded: 'Bookmarks toggle visual states dynamically.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'pbi_connect', expectedOutput: 'BOOKMARKS' }
    ]
  },

  // LEVEL 6: Power BI Service
  {
    projectId: 'pbi-service',
    environment: 'linux',
    description: 'Learn workspaces management, app publishing, dashboard creations, and collaborate shares.',
    objective: 'Publish reports to shared workspaces.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'Publish enterprise reports', instruction: 'In the data source connection parameter, type "PROD_WORKSPACE". Click "Publish Workspace".', summary: 'Publish to portal.', whyNeeded: 'Workspaces distribute reports securely.', pillarConnection: 'Security', commands: [], checkCommand: 'pbi_publish_workspace', expectedOutput: 'PROD_WORKSPACE' }
    ]
  },
  {
    projectId: 'pbi-refresh',
    environment: 'linux',
    description: 'Configure scheduled data refreshes, gateways, and deployment pipelines.',
    objective: 'Configure gateway schedules.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'Configure refresh', instruction: 'Click "Refresh Model" in the top bar ribbon.', summary: 'Execute scheduled refresh.', whyNeeded: 'Refreshes ensure charts match live databases.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'pbi_refresh', expectedOutput: 'true' }
    ]
  },

  // LEVEL 7: Security
  {
    projectId: 'pbi-security',
    environment: 'linux',
    description: 'Configure Row Level Security (RLS), Object Level Security (OLS), and Entra ID roles.',
    objective: 'Enforce Row Level Security.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'Secure reports', instruction: 'In the DAX formula input, type "RegionFilter = USERNAME()" and click Apply.', summary: 'Enforce RLS username filter.', whyNeeded: 'RLS locks down rows based on user authentication profiles.', pillarConnection: 'Security', commands: [], checkCommand: 'pbi_dax', expectedOutput: 'RegionFilter = USERNAME()' }
    ]
  },

  // LEVEL 8: Performance Optimization
  {
    projectId: 'pbi-optimize',
    environment: 'linux',
    description: 'Optimize reports using DAX Studio, Performance Analyzer, and VertiPaq compression checks.',
    objective: 'Speed up DAX execution query times.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Speed up reports', instruction: 'In the DAX formula input, type "OptimizedMeasure = DIVIDE(SUM(Sales[Amount]), 100)" and click Apply.', summary: 'Apply DIVIDE function.', whyNeeded: 'DIVIDE handles division-by-zero checks faster than standard / operators.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'pbi_dax', expectedOutput: 'OptimizedMeasure = DIVIDE(SUM(Sales[Amount]), 100)' }
    ]
  },

  // LEVEL 9: Microsoft Fabric
  {
    projectId: 'pbi-fabric',
    environment: 'linux',
    description: 'Configure Fabric workspaces, capacity nodes, and OneLake folders.',
    objective: 'Provision a Fabric workspace.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Create Fabric workspace', instruction: 'In the data source connection parameter, type "FABRIC_WORKSPACE". Click "Publish Workspace".', summary: 'Publish to Fabric portal.', whyNeeded: 'Fabric unifies storage, ingestion, and dashboarding.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'pbi_publish_workspace', expectedOutput: 'FABRIC_WORKSPACE' }
    ]
  },
  {
    projectId: 'pbi-lakehouse',
    environment: 'linux',
    description: 'Build a Fabric Lakehouse, upload files, and query Delta Tables.',
    objective: 'Load Delta Tables into Lakehouses.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Build analytics lakehouse', instruction: 'Switch to "data" view mode. In Query Transformation Actions, type "DELTA_TABLE" and click Apply Step.', summary: 'Load delta table rows.', whyNeeded: 'Delta tables provide ACID transactional bounds on files.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_etl', expectedOutput: 'DELTA_TABLE' }
    ]
  },
  {
    projectId: 'pbi-warehouse',
    environment: 'linux',
    description: 'Configure a Fabric Synapse SQL Warehouse, load data, and run SQL queries.',
    objective: 'Execute Synapse Warehouse queries.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Enterprise warehouse', instruction: 'In the data source connection parameter, type "SYNAPSE_WAREHOUSE" and click Connect.', summary: 'Query warehouse.', whyNeeded: 'SQL warehouses index files for analytical aggregates.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_connect', expectedOutput: 'SYNAPSE_WAREHOUSE' }
    ]
  },
  {
    projectId: 'pbi-factory',
    environment: 'linux',
    description: 'Build pipelines in Data Factory: Copy Activity and Dataflows Gen2 scheduling.',
    objective: 'Configure Data Factory pipelines.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Build ETL pipeline', instruction: 'Switch to "data" view mode. In Query Transformation Actions, type "COPY_ACTIVITY" and click Apply Step.', summary: 'Trigger copy activity.', whyNeeded: 'Copy activities schedule batch datasets transfers.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'pbi_etl', expectedOutput: 'COPY_ACTIVITY' }
    ]
  },
  {
    projectId: 'pbi-realtime',
    environment: 'linux',
    description: 'Ingest real-time Event Streams, run KQL database queries, and build live dashboards.',
    objective: 'Stream real-time KQL database rows.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Stream IoT data', instruction: 'In the data source connection parameter, type "EVENT_STREAMS" and click Connect.', summary: 'Ingest event stream.', whyNeeded: 'Streams enable monitoring of dynamic sensor metrics.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_connect', expectedOutput: 'EVENT_STREAMS' }
    ]
  },

  // LEVEL 10: AI
  {
    projectId: 'pbi-ai',
    environment: 'linux',
    description: 'Add AI capabilities: Smart Narratives, Copilot forecasting, and anomaly detection.',
    objective: 'Deploy forecasting models.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'AI-powered dashboards', instruction: 'In the data source connection parameter, type "FORECASTING" and click Connect.', summary: 'Apply anomaly check.', whyNeeded: 'Forecasting uses historical columns to model growth margins.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_connect', expectedOutput: 'FORECASTING' }
    ]
  },

  // LEVEL 11: Administration
  {
    projectId: 'pbi-admin',
    environment: 'linux',
    description: 'Configure tenant settings, capacities monitoring, licensing profiles, and auditing dashboards.',
    objective: 'Manage tenant admin portals.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Configure enterprise tenant', instruction: 'In the data source connection parameter, type "ADMIN_PORTAL". Click "Publish Workspace".', summary: 'Enforce admin restrictions.', whyNeeded: 'Tenant settings block unauthorized exports.', pillarConnection: 'Security', commands: [], checkCommand: 'pbi_publish_workspace', expectedOutput: 'ADMIN_PORTAL' }
    ]
  },

  // LEVEL 12: Automation
  {
    projectId: 'pbi-automate',
    environment: 'linux',
    description: 'Automate deployments: Power Automate tasks, XMLA endpoint scripts, and PowerShell pipelines.',
    objective: 'Trigger automated PowerShell refreshes.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Automate report deployment', instruction: 'Click "Refresh Model" in the top bar ribbon.', summary: 'Trigger automation loop.', whyNeeded: 'PowerShell APIs automate routine workspace tasks.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'pbi_refresh', expectedOutput: 'true' }
    ]
  },

  // LEVEL 13: Embedded Analytics
  {
    projectId: 'pbi-embed',
    environment: 'linux',
    description: 'Embed dashboards into websites: configure Azure AD apps, token generations, and JS SDK.',
    objective: 'Generate embedded tokens.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Embed reports', instruction: 'In the DAX formula input, type "EmbedToken = \"TOKEN_123\"" and click Apply.', summary: 'Set token values.', whyNeeded: 'Tokens authorize anonymous webpage visitors to load secure visual grids.', pillarConnection: 'Security', commands: [], checkCommand: 'pbi_dax', expectedOutput: 'EmbedToken = "TOKEN_123"' }
    ]
  },

  // LEVEL 14: Paginated Reports
  {
    projectId: 'pbi-paginated',
    environment: 'linux',
    description: 'Build pixel-perfect paginated reports in Report Builder, parameters, and layouts print outputs.',
    objective: 'Generate printable invoices.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'Build invoices', instruction: 'In the data source connection parameter, type "PAGINATED_INVOICE" and click Connect.', summary: 'Format invoice cells.', whyNeeded: 'Paginated formats ensure rows align across PDF pages.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_connect', expectedOutput: 'PAGINATED_INVOICE' }
    ]
  },

  // LEVEL 15: Enterprise Architecture
  {
    projectId: 'pbi-enterprise',
    environment: 'linux',
    description: 'Design enterprise BI platforms: Medallion Architecture, CI/CD, and semantic modeling.',
    objective: 'Design medallion semantic models.',
    missionNumber: 1, totalMissions: 1, xpReward: 350,
    steps: [
      { id: '1', title: 'Enterprise reporting platform', instruction: 'Switch to "model" view mode. In Join Relationship Constraints input, type "1-to-many" and click Define Relationship.', summary: 'Verify core relationships.', whyNeeded: 'Star schemas structure dimensions.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_relationship', expectedOutput: '1-to-many' }
    ]
  },

  // LEVEL 16: Industry Solutions
  {
    projectId: 'pbi-solutions',
    environment: 'linux',
    description: 'Analyze pre-packaged dashboards: Retail sales, finance ledger statements, healthcare outcomes, and rosters.',
    objective: 'Examine sales solution models.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Sales Dashboard', instruction: 'Switch to "report" view mode. In the data source connection parameter, type "SALES_SOLUTION" and click Connect.', summary: 'Examine sales layout.', whyNeeded: 'Industry solutions demonstrate standard KPI formulas.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_connect', expectedOutput: 'SALES_SOLUTION' }
    ]
  },

  // LEVEL 17: Capstone Projects (Expert)
  {
    projectId: 'pbi-project-sales',
    environment: 'linux',
    description: 'Capstone: Executive Sales Analytics. Build a complete sales dashboard with KPIs, drillthroughs, and role-based security.',
    objective: 'Build executive sales dashboard.',
    missionNumber: 1, totalMissions: 1, xpReward: 400,
    steps: [
      { id: '1', title: 'Executive Sales Analytics', instruction: 'In the DAX formula input, type "ExecutiveSales = CALCULATE(SUM(Sales[Amount]), ALL(Sales))" and click Apply.', summary: 'Validate calculation measure.', whyNeeded: 'Measures calculate company aggregates.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_dax', expectedOutput: 'ExecutiveSales = CALCULATE(SUM(Sales[Amount]), ALL(Sales))' }
    ]
  },
  {
    projectId: 'pbi-project-finance',
    environment: 'linux',
    description: 'Capstone: Financial Reporting Suite. Build profit & loss templates, balance sheets, and budget models.',
    objective: 'Develop finance reporting dashboards.',
    missionNumber: 1, totalMissions: 1, xpReward: 400,
    steps: [
      { id: '1', title: 'Financial Reporting Suite', instruction: 'In the DAX formula input, type "NetMargin = DIVIDE(SUM(Finance[NetProfit]), SUM(Finance[Revenue]))" and click Apply.', summary: 'Validate net margin DAX.', whyNeeded: 'Net margins evaluate corporate profitability.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_dax', expectedOutput: 'NetMargin = DIVIDE(SUM(Finance[NetProfit]), SUM(Finance[Revenue]))' }
    ]
  },
  {
    projectId: 'pbi-project-supply',
    environment: 'linux',
    description: 'Capstone: Supply Chain Analytics. Configure procurement grids, warehouse capacities, and forecasts.',
    objective: 'Develop logistics analytical pipelines.',
    missionNumber: 1, totalMissions: 1, xpReward: 400,
    steps: [
      { id: '1', title: 'Supply Chain Analytics', instruction: 'In the data source connection parameter, type "SUPPLY_CHAIN" and click Connect.', summary: 'Verify supply chain sources.', whyNeeded: 'Procurement analysis prevents warehouse stock outages.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_connect', expectedOutput: 'SUPPLY_CHAIN' }
    ]
  },
  {
    projectId: 'pbi-project-hr',
    environment: 'linux',
    description: 'Capstone: HR Analytics. Design workforce demographic metrics, retention charts, and performance grades.',
    objective: 'Build retention analysis graphs.',
    missionNumber: 1, totalMissions: 1, xpReward: 400,
    steps: [
      { id: '1', title: 'HR Analytics', instruction: 'In the DAX formula input, type "AttritionRate = DIVIDE(COUNT(HR[Leavers]), COUNT(HR[Employees]))" and click Apply.', summary: 'Validate attrition DAX.', whyNeeded: 'Attrition measures indicate workforce retention rates.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_dax', expectedOutput: 'AttritionRate = DIVIDE(COUNT(HR[Leavers]), COUNT(HR[Employees]))' }
    ]
  },
  {
    projectId: 'pbi-project-mfg',
    environment: 'linux',
    description: 'Capstone: Manufacturing Analytics. Analyze production throughput, downtime, and OEE metrics.',
    objective: 'Calculate Overall Equipment Effectiveness (OEE).',
    missionNumber: 1, totalMissions: 1, xpReward: 400,
    steps: [
      { id: '1', title: 'Manufacturing Analytics', instruction: 'In the DAX formula input, type "OEE = DIVIDE(SUM(Mfg[Output]), SUM(Mfg[Capacity]))" and click Apply.', summary: 'Validate OEE DAX.', whyNeeded: 'OEE monitors factory runtime efficiency.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_dax', expectedOutput: 'OEE = DIVIDE(SUM(Mfg[Output]), SUM(Mfg[Capacity]))' }
    ]
  },
  {
    projectId: 'pbi-project-healthcare',
    environment: 'linux',
    description: 'Capstone: Healthcare Analytics. Design clinical patient admission times and occupancy charts.',
    objective: 'Build hospital occupancy sheets.',
    missionNumber: 1, totalMissions: 1, xpReward: 400,
    steps: [
      { id: '1', title: 'Healthcare Analytics', instruction: 'In the data source connection parameter, type "HEALTHCARE" and click Connect.', summary: 'Validate healthcare connector.', whyNeeded: 'Occupancy sheets track emergency room capacities.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_connect', expectedOutput: 'HEALTHCARE' }
    ]
  },
  {
    projectId: 'pbi-project-banking',
    environment: 'linux',
    description: 'Capstone: Banking & Financial Services. Model customer risk scores and loan portfolios.',
    objective: 'Model loan portfolios.',
    missionNumber: 1, totalMissions: 1, xpReward: 400,
    steps: [
      { id: '1', title: 'Banking & Financial Services Analytics', instruction: 'In the DAX formula input, type "DefaultRate = DIVIDE(COUNT(Loans[Defaults]), COUNT(Loans[Total]))" and click Apply.', summary: 'Validate risk metric DAX.', whyNeeded: 'Default metrics track loan defaults.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_dax', expectedOutput: 'DefaultRate = DIVIDE(COUNT(Loans[Defaults]), COUNT(Loans[Total]))' }
    ]
  },
  {
    projectId: 'pbi-project-marketing',
    environment: 'linux',
    description: 'Capstone: Marketing & Customer Analytics. Calculate customer acquisition cost (CAC) and customer lifetime value (CLV).',
    objective: 'Calculate customer acquisition costs.',
    missionNumber: 1, totalMissions: 1, xpReward: 400,
    steps: [
      { id: '1', title: 'Marketing & Customer Analytics', instruction: 'In the DAX formula input, type "CAC = DIVIDE(SUM(Marketing[Spend]), COUNT(Customers[New]))" and click Apply.', summary: 'Validate CAC DAX.', whyNeeded: 'CAC maps marketing spends to new customer lists.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pbi_dax', expectedOutput: 'CAC = DIVIDE(SUM(Marketing[Spend]), COUNT(Customers[New]))' }
    ]
  },
  {
    projectId: 'pbi-project-fabric',
    environment: 'linux',
    description: 'Capstone: Fabric End-to-End. Ingest data to OneLake using Data Factory, transform rows, and publish to Fabric.',
    objective: 'Execute end-to-end Fabric analytic models.',
    missionNumber: 1, totalMissions: 1, xpReward: 400,
    steps: [
      { id: '1', title: 'Microsoft Fabric End-to-End Solution', instruction: 'In the data source connection parameter, type "FABRIC_ONELAKE" and click Connect.', summary: 'Connect OneLake.', whyNeeded: 'OneLake unifies organizational data blocks.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'pbi_connect', expectedOutput: 'FABRIC_ONELAKE' }
    ]
  },
  {
    projectId: 'pbi-project-enterprise',
    environment: 'linux',
    description: 'Capstone: Enterprise BI Platform. Deploy semantic models pipelines with RLS and automated version control.',
    objective: 'Deploy enterprise semantic dashboard systems.',
    missionNumber: 1, totalMissions: 1, xpReward: 400,
    steps: [
      { id: '1', title: 'Enterprise BI Platform', instruction: 'Switch to "model" view mode. In Join Relationship Constraints input, type "1-to-many" and click Define Relationship.', summary: 'Verify semantic schema relationships.', whyNeeded: 'Relationships govern star schema filter limits.', pillarConnection: 'Security', commands: [], checkCommand: 'pbi_relationship', expectedOutput: '1-to-many' }
    ]
  }
];
