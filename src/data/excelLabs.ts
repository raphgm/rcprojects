import { LabContent } from '../types/content';

export const excelLabs: LabContent[] = [
  {
    projectId: 'excel-fundamentals',
    environment: 'linux',
    description: 'Learn spreadsheet design, Ribbons, cells navigation, ranges, formulas, and auto-fills inside our interactive grid.',
    objective: 'Complete the Excel Fundamentals roadmap by populating grid values, applying SUM formulas, copying ranges, and testing Undos.',
    missionNumber: 1,
    totalMissions: 1,
    xpReward: 250,
    steps: [
      { id: '1', title: 'Introduction to Excel', instruction: 'Familiarize yourself with the ribbon and select cell A1. Enter "100" in cell A1.', summary: 'Populate starting data.', whyNeeded: 'Every workbook begins by loading raw constants.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'check_a1', expectedOutput: '100' },
      { id: '2', title: 'Excel Interface (Ribbon, Worksheets)', instruction: 'Select B1 and enter "50".', summary: 'Populate comparison node.', whyNeeded: 'A secondary constant is required to test formula logic.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'check_b1', expectedOutput: '50' },
      { id: '3', title: 'Rows, Columns, and Cells', instruction: 'Select C1 and enter "=A1+B1" to sum A1 and B1.', summary: 'Add formula.', whyNeeded: 'Dynamic referencing automatically recalculates spreadsheet sums.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'check_c1', expectedOutput: '150' },
      { id: '4', title: 'Creating and saving workbooks', instruction: 'Enter "10" in A2, "20" in A3, and "30" in A4.', summary: 'Prepare range sums.', whyNeeded: 'Defining vertically aligned records allows testing multi-row ranges.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'check_range_sum', expectedOutput: 'true' },
      { id: '5', title: 'Navigating worksheets', instruction: 'Select B2 and enter "=SUM(A1:A4)" to sum the entire range.', summary: 'Apply SUM range.', whyNeeded: 'Range sum operations are the primary aggregate mechanism in Excel.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'check_sum_a1_a4', expectedOutput: '160' },
      { id: '6', title: 'Selecting cells and ranges', instruction: 'Fill A5 with "5" and B5 with "5".', summary: 'Add secondary range items.', whyNeeded: 'Preparing cells allows testing auto-fill and copying.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'check_row5', expectedOutput: 'true' },
      { id: '7', title: 'AutoFill and Flash Fill', instruction: 'Verify B5 is set to "5". Fill C5 with "=A5+B5" to get "10".', summary: 'Verify Row 5 sum.', whyNeeded: 'Confirming calculations on row boundaries checks validation logic.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'check_c5', expectedOutput: '10' },
      { id: '8', title: 'Copy, Cut, Paste', instruction: 'Set D1 to "100" and E1 to "50" representing the copy operation.', summary: 'Move data.', whyNeeded: 'Pasting data replicates cell structures in different column scopes.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'check_d1_e1', expectedOutput: 'true' },
      { id: '9', title: 'Undo and Redo', instruction: 'Clear D1 to "0" or empty using the Undo button or edits to complete.', summary: 'Revert adjustments.', whyNeeded: 'Reverting actions is essential to correct formula mistakes.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'check_undo', expectedOutput: 'true' }
    ]
  },
  {
    projectId: 'excel-formatting',
    environment: 'linux',
    description: 'Master cell layout, number formats, date aggregations, text alignments, cell borders, presets, and color fills.',
    objective: 'Complete the Excel Formatting roadmap by entering sales report records and applying formatting styles.',
    missionNumber: 1,
    totalMissions: 1,
    xpReward: 300,
    steps: [
      { id: '1', title: 'Cell formatting', instruction: 'Enter "Sales Report" in A1. Select A1 and click the Bold (B) button in the toolbar to apply bold formatting.', summary: 'Make A1 Bold.', whyNeeded: 'Titles should be clearly distinguished using bold typography.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'format_bold_a1', expectedOutput: 'true' },
      { id: '2', title: 'Number formats', instruction: 'Enter "1500" in cell A2. Select A2 and choose the "Number" format option in the format selector dropdown.', summary: 'Apply number format to A2.', whyNeeded: 'Number formats automatically format thousands separators.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'format_number_a2', expectedOutput: 'true' },
      { id: '3', title: 'Dates and Times', instruction: 'Enter "2026-06-30" in cell A3. Select A3 and choose the "Short Date" format option in the format selector dropdown.', summary: 'Apply date format to A3.', whyNeeded: 'Date formats allow spreadsheet calculations to parse chronological periods.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'format_date_a3', expectedOutput: 'true' },
      { id: '4', title: 'Currency formatting', instruction: 'Enter "250" in cell A4. Select A4 and choose the "Currency" format option in the format selector dropdown.', summary: 'Apply currency format to A4.', whyNeeded: 'Financial reporting columns require currency symbols ($).', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'format_currency_a4', expectedOutput: 'true' },
      { id: '5', title: 'Fonts and text formatting', instruction: 'Enter "Q2 Summary" in cell B1. Select B1 and click the Italic (I) button in the toolbar to apply italic formatting.', summary: 'Make B1 Italic.', whyNeeded: 'Italic text highlights key summary regions or notes.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'format_italic_b1', expectedOutput: 'true' },
      { id: '6', title: 'Cell alignment', instruction: 'Ensure B1 is selected and click the Center Align button in the toolbar.', summary: 'Center-align B1.', whyNeeded: 'Text alignments improve reading scanning lines.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'format_align_b1', expectedOutput: 'true' },
      { id: '7', title: 'Borders and colors', instruction: 'Select A1 and click the Border icon in the toolbar to toggle thick borders.', summary: 'Toggle border on A1.', whyNeeded: 'Borders visually divide layout sections.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'format_border_a1', expectedOutput: 'true' },
      { id: '8', title: 'Cell styles', instruction: 'Select A1 and choose the "Heading 1" style option in the Style selector dropdown.', summary: 'Apply Heading style to A1.', whyNeeded: 'Applying preset heading styles maintains layout design consistency.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'format_style_a1', expectedOutput: 'true' },
      { id: '9', title: 'Conditional formatting', instruction: 'Select A4 and click the Fill Color picker to fill cell A4 with light green color.', summary: 'Fill A4 with green.', whyNeeded: 'Color highlights call attention to positive margins.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'format_color_a4', expectedOutput: 'true' },
      { id: '10', title: 'Themes', instruction: 'Select B1 and choose the "Accent Fill" style option in the Style selector dropdown.', summary: 'Apply Accent style to B1.', whyNeeded: 'Accent presets match corporate layout themes.', pillarConnection: 'Operational Excellence', commands: [], checkCommand: 'format_theme_b1', expectedOutput: 'true' }
    ]
  },
  {
    projectId: 'excel-worksheets',
    environment: 'linux',
    description: 'Insert, delete, rename, move, hide, protect, group, freeze panes, and split sheets in Excel.',
    objective: 'Complete the worksheets roadmap by configuring sheet parameters.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Insert/Delete worksheets', instruction: 'Enter "Sheet Inserted" in cell A1 to simulate adding a new worksheet tab.', summary: 'Insert worksheet.', whyNeeded: 'Adding tabs allows separating raw data from reporting layers.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sheet_insert', expectedOutput: 'Sheet Inserted' },
      { id: '2', title: 'Rename worksheets', instruction: 'Enter "Sheet Renamed" in cell A1 to simulate renaming the workbook page.', summary: 'Rename worksheet.', whyNeeded: 'Proper worksheet titles help trace downstream formula links.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sheet_rename', expectedOutput: 'Sheet Renamed' },
      { id: '3', title: 'Move and copy sheets', instruction: 'Enter "Sheet Copied" in cell A1 to simulate copying workbook templates.', summary: 'Copy worksheet.', whyNeeded: 'Copying sheets duplicates formatting layouts without data loss.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sheet_move', expectedOutput: 'Sheet Copied' },
      { id: '4', title: 'Hide/Unhide sheets', instruction: 'Enter "Sheet Hidden" in cell A1 to simulate hiding reference tables.', summary: 'Hide worksheet.', whyNeeded: 'Hiding pages cleans dashboard interfaces from configuration constants.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sheet_hide', expectedOutput: 'Sheet Hidden' },
      { id: '5', title: 'Protect worksheets', instruction: 'Enter "Sheet Protected" in cell A1 to toggle cell locking controls.', summary: 'Lock worksheet cells.', whyNeeded: 'Protecting tabs safeguards core formulas from accidental edits.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sheet_protect', expectedOutput: 'Sheet Protected' },
      { id: '6', title: 'Freeze panes', instruction: 'Enter "Freeze Panes" in cell A1 to simulate locking row 1.', summary: 'Freeze panes.', whyNeeded: 'Freezing rows retains header titles during vertical scrolling.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sheet_freeze', expectedOutput: 'Freeze Panes' },
      { id: '7', title: 'Split windows', instruction: 'Enter "Split View" in cell A1 to split screen grid grids.', summary: 'Split layout.', whyNeeded: 'Split views display distant row segments simultaneously.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sheet_split', expectedOutput: 'Split View' },
      { id: '8', title: 'Group worksheets', instruction: 'Enter "Grouped Sheets" in cell A1 to edit multiple tabs together.', summary: 'Group tabs.', whyNeeded: 'Grouping sheets replicates edits across identical layouts.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'sheet_group', expectedOutput: 'Grouped Sheets' }
    ]
  },
  {
    projectId: 'excel-basic-formulas',
    environment: 'linux',
    description: 'Master cell references (relative, absolute, mixed), formula auditing, AutoSum, and basic math calculations.',
    objective: 'Apply basic spreadsheet math and cell references.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Formula basics', instruction: 'Enter "=A2+B2" in cell A1 to verify basic formula evaluation.', summary: 'Add basic formula.', whyNeeded: 'Formulas automatically calculate dynamic relationships.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'formula_basics', expectedOutput: '=A2+B2' },
      { id: '2', title: 'Cell references', instruction: 'Enter "=C2" in cell A1 to reference another column coordinate.', summary: 'Link cell.', whyNeeded: 'Referencing cells updates values automatically when sources shift.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'formula_refs', expectedOutput: '=C2' },
      { id: '3', title: 'Relative references', instruction: 'Enter "=B1+C1" in A1 to reference surrounding constants.', summary: 'Add relative sum.', whyNeeded: 'Relative references shift coordinate rows when copied.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'formula_relative', expectedOutput: '=B1+C1' },
      { id: '4', title: 'Absolute references', instruction: 'Enter "=$B$1" in cell A1 to test absolute freezing.', summary: 'Apply absolute block.', whyNeeded: 'Absolute references block row/column coordinates during copying.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'formula_absolute', expectedOutput: '=$B$1' },
      { id: '5', title: 'Mixed references', instruction: 'Enter "=$B1" in cell A1 to apply mixed column locks.', summary: 'Lock column.', whyNeeded: 'Mixed references keep column coordinates rigid while row lines float.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'formula_mixed', expectedOutput: '=$B1' },
      { id: '6', title: 'Formula auditing', instruction: 'Enter "Trace Precedents" in A1 to simulate audit routes.', summary: 'Audit formulas.', whyNeeded: 'Auditing traces value relationships to troubleshoot errors.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'formula_audit', expectedOutput: 'Trace Precedents' },
      { id: '7', title: 'AutoSum', instruction: 'Enter "=SUM(A2:A5)" in A1 to perform AutoSum.', summary: 'Trigger AutoSum.', whyNeeded: 'AutoSum quickly aggregates coordinate ranges with one tap.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'formula_autosum', expectedOutput: '=SUM(A2:A5)' }
    ]
  },
  {
    projectId: 'excel-essential-functions',
    environment: 'linux',
    description: 'Master mathematical, logical (IF, IFS, AND, OR), text, and date & time function suites.',
    objective: 'Apply mathematical, logical, text, and date functions.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'SUM', instruction: 'Enter "=SUM(A2:A5)" in cell A1.', summary: 'Apply SUM.', whyNeeded: 'Sums ranges.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_sum', expectedOutput: '=SUM(A2:A5)' },
      { id: '2', title: 'AVERAGE', instruction: 'Enter "=AVERAGE(A2:A5)" in cell A1.', summary: 'Apply AVERAGE.', whyNeeded: 'Computes average.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_average', expectedOutput: '=AVERAGE(A2:A5)' },
      { id: '3', title: 'MIN', instruction: 'Enter "=MIN(A2:A5)" in cell A1.', summary: 'Apply MIN.', whyNeeded: 'Gets minimum.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_min', expectedOutput: '=MIN(A2:A5)' },
      { id: '4', title: 'MAX', instruction: 'Enter "=MAX(A2:A5)" in cell A1.', summary: 'Apply MAX.', whyNeeded: 'Gets maximum.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_max', expectedOutput: '=MAX(A2:A5)' },
      { id: '5', title: 'COUNT', instruction: 'Enter "=COUNT(A2:A5)" in cell A1.', summary: 'Apply COUNT.', whyNeeded: 'Counts numbers.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_count', expectedOutput: '=COUNT(A2:A5)' },
      { id: '6', title: 'COUNTA', instruction: 'Enter "=COUNTA(A2:A5)" in cell A1.', summary: 'Apply COUNTA.', whyNeeded: 'Counts any characters.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_counta', expectedOutput: '=COUNTA(A2:A5)' },
      { id: '7', title: 'ROUND', instruction: 'Enter "=ROUND(B1,2)" in cell A1.', summary: 'Apply ROUND.', whyNeeded: 'Rounds float.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_round', expectedOutput: '=ROUND(B1,2)' },
      { id: '8', title: 'ROUNDUP', instruction: 'Enter "=ROUNDUP(B1,0)" in cell A1.', summary: 'Apply ROUNDUP.', whyNeeded: 'Rounds up.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_roundup', expectedOutput: '=ROUNDUP(B1,0)' },
      { id: '9', title: 'ROUNDDOWN', instruction: 'Enter "=ROUNDDOWN(B1,0)" in cell A1.', summary: 'Apply ROUNDDOWN.', whyNeeded: 'Rounds down.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_rounddown', expectedOutput: '=ROUNDDOWN(B1,0)' },
      { id: '10', title: 'INT', instruction: 'Enter "=INT(B1)" in cell A1.', summary: 'Apply INT.', whyNeeded: 'Gets integer.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_int', expectedOutput: '=INT(B1)' },
      { id: '11', title: 'IF', instruction: 'Enter "=IF(B1>100,\"Yes\",\"No\")" in cell A1.', summary: 'Apply IF.', whyNeeded: 'Checks logic.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_if', expectedOutput: '=IF(B1>100,"Yes","No")' },
      { id: '12', title: 'IFS', instruction: 'Enter "=IFS(B1>90,\"A\",B1>80,\"B\")" in cell A1.', summary: 'Apply IFS.', whyNeeded: 'Checks multiple options.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_ifs', expectedOutput: '=IFS(B1>90,"A",B1>80,"B")' },
      { id: '13', title: 'AND', instruction: 'Enter "=AND(B1>0,B1<10)" in cell A1.', summary: 'Apply AND.', whyNeeded: 'Evaluates logical values.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_and', expectedOutput: '=AND(B1>0,B1<10)' },
      { id: '14', title: 'OR', instruction: 'Enter "=OR(B1=0,B1=1)" in cell A1.', summary: 'Apply OR.', whyNeeded: 'Checks alternatives.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_or', expectedOutput: '=OR(B1=0,B1=1)' },
      { id: '15', title: 'NOT', instruction: 'Enter "=NOT(B1)" in cell A1.', summary: 'Apply NOT.', whyNeeded: 'Inverts logic.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_not', expectedOutput: '=NOT(B1)' },
      { id: '16', title: 'IFERROR', instruction: 'Enter "=IFERROR(B1/C1,0)" in cell A1.', summary: 'Apply IFERROR.', whyNeeded: 'Prevents calculation crashes.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_iferror', expectedOutput: '=IFERROR(B1/C1,0)' },
      { id: '17', title: 'LEFT', instruction: 'Enter "=LEFT(B1,3)" in cell A1.', summary: 'Apply LEFT.', whyNeeded: 'Extracts start characters.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_left', expectedOutput: '=LEFT(B1,3)' },
      { id: '18', title: 'RIGHT', instruction: 'Enter "=RIGHT(B1,3)" in cell A1.', summary: 'Apply RIGHT.', whyNeeded: 'Extracts end characters.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_right', expectedOutput: '=RIGHT(B1,3)' },
      { id: '19', title: 'MID', instruction: 'Enter "=MID(B1,2,3)" in cell A1.', summary: 'Apply MID.', whyNeeded: 'Extracts center characters.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_mid', expectedOutput: '=MID(B1,2,3)' },
      { id: '20', title: 'LEN', instruction: 'Enter "=LEN(B1)" in cell A1.', summary: 'Apply LEN.', whyNeeded: 'Counts characters.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_len', expectedOutput: '=LEN(B1)' },
      { id: '21', title: 'TRIM', instruction: 'Enter "=TRIM(B1)" in cell A1.', summary: 'Apply TRIM.', whyNeeded: 'Removes whitespaces.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_trim', expectedOutput: '=TRIM(B1)' },
      { id: '22', title: 'CONCAT', instruction: 'Enter "=CONCAT(B1,C1)" in cell A1.', summary: 'Apply CONCAT.', whyNeeded: 'Joins values.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_concat', expectedOutput: '=CONCAT(B1,C1)' },
      { id: '23', title: 'CONCATENATE', instruction: 'Enter "=CONCATENATE(B1,\" \",C1)" in cell A1.', summary: 'Apply CONCATENATE.', whyNeeded: 'Joins with spacing.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_concatenate', expectedOutput: '=CONCATENATE(B1," ",C1)' },
      { id: '24', title: 'TEXTJOIN', instruction: 'Enter "=TEXTJOIN(\",\",TRUE,B1:C1)" in cell A1.', summary: 'Apply TEXTJOIN.', whyNeeded: 'Joins range cells.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_textjoin', expectedOutput: '=TEXTJOIN(",",TRUE,B1:C1)' },
      { id: '25', title: 'UPPER', instruction: 'Enter "=UPPER(B1)" in cell A1.', summary: 'Apply UPPER.', whyNeeded: 'Capitalizes text.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_upper', expectedOutput: '=UPPER(B1)' },
      { id: '26', title: 'LOWER', instruction: 'Enter "=LOWER(B1)" in cell A1.', summary: 'Apply LOWER.', whyNeeded: 'Lowercase conversion.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_lower', expectedOutput: '=LOWER(B1)' },
      { id: '27', title: 'PROPER', instruction: 'Enter "=PROPER(B1)" in cell A1.', summary: 'Apply PROPER.', whyNeeded: 'Capitalizes first letters.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_proper', expectedOutput: '=PROPER(B1)' },
      { id: '28', title: 'TODAY', instruction: 'Enter "=TODAY()" in cell A1.', summary: 'Apply TODAY.', whyNeeded: 'Gets today date.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_today', expectedOutput: '=TODAY()' },
      { id: '29', title: 'NOW', instruction: 'Enter "=NOW()" in cell A1.', summary: 'Apply NOW.', whyNeeded: 'Gets current time.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_now', expectedOutput: '=NOW()' },
      { id: '30', title: 'YEAR', instruction: 'Enter "=YEAR(B1)" in cell A1.', summary: 'Apply YEAR.', whyNeeded: 'Gets year.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_year', expectedOutput: '=YEAR(B1)' },
      { id: '31', title: 'MONTH', instruction: 'Enter "=MONTH(B1)" in cell A1.', summary: 'Apply MONTH.', whyNeeded: 'Gets month.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_month', expectedOutput: '=MONTH(B1)' },
      { id: '32', title: 'DAY', instruction: 'Enter "=DAY(B1)" in cell A1.', summary: 'Apply DAY.', whyNeeded: 'Gets day.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_day', expectedOutput: '=DAY(B1)' },
      { id: '33', title: 'EDATE', instruction: 'Enter "=EDATE(B1,3)" in cell A1.', summary: 'Apply EDATE.', whyNeeded: 'Shifts months.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_edate', expectedOutput: '=EDATE(B1,3)' },
      { id: '34', title: 'EOMONTH', instruction: 'Enter "=EOMONTH(B1,0)" in cell A1.', summary: 'Apply EOMONTH.', whyNeeded: 'Gets last day of month.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_eomonth', expectedOutput: '=EOMONTH(B1,0)' },
      { id: '35', title: 'DATEDIF', instruction: 'Enter "=DATEDIF(B1,C1,\"D\")" in cell A1.', summary: 'Apply DATEDIF.', whyNeeded: 'Calculates date difference.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_datedif', expectedOutput: '=DATEDIF(B1,C1,"D")' }
    ]
  },
  {
    projectId: 'excel-lookup-reference',
    environment: 'linux',
    description: 'Master VLOOKUP, HLOOKUP, XLOOKUP, INDEX, MATCH, OFFSET, and CHOOSE references.',
    objective: 'Apply workbook lookups.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'VLOOKUP', instruction: 'Enter "=VLOOKUP(B1,C1:D3,2,FALSE)" in cell A1.', summary: 'VLOOKUP query.', whyNeeded: 'Scans vertical database keys.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_vlookup', expectedOutput: '=VLOOKUP(B1,C1:D3,2,FALSE)' },
      { id: '2', title: 'HLOOKUP', instruction: 'Enter "=HLOOKUP(B1,C1:D3,2,FALSE)" in cell A1.', summary: 'HLOOKUP query.', whyNeeded: 'Scans horizontal database rows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_hlookup', expectedOutput: '=HLOOKUP(B1,C1:D3,2,FALSE)' },
      { id: '3', title: 'XLOOKUP', instruction: 'Enter "=XLOOKUP(B1,C1:C5,D1:D5)" in cell A1.', summary: 'XLOOKUP query.', whyNeeded: 'Scans modern database arrays safely.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_xlookup', expectedOutput: '=XLOOKUP(B1,C1:C5,D1:D5)' },
      { id: '4', title: 'LOOKUP', instruction: 'Enter "=LOOKUP(B1,C1:D5)" in cell A1.', summary: 'Legacy LOOKUP.', whyNeeded: 'Scans vector rows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_lookup', expectedOutput: '=LOOKUP(B1,C1:D5)' },
      { id: '5', title: 'INDEX', instruction: 'Enter "=INDEX(B1:C5,2,2)" in cell A1.', summary: 'INDEX lookup.', whyNeeded: 'Retrieves coordinate values.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_index', expectedOutput: '=INDEX(B1:C5,2,2)' },
      { id: '6', title: 'MATCH', instruction: 'Enter "=MATCH(B1,C1:C5,0)" in cell A1.', summary: 'MATCH locator.', whyNeeded: 'Finds row index.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_match', expectedOutput: '=MATCH(B1,C1:C5,0)' },
      { id: '7', title: 'INDEX + MATCH', instruction: 'Enter "=INDEX(D1:D5,MATCH(B1,C1:C5,0))" in cell A1.', summary: 'INDEX+MATCH.', whyNeeded: 'Flexible vertical lookups.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_index_match', expectedOutput: '=INDEX(D1:D5,MATCH(B1,C1:C5,0))' },
      { id: '8', title: 'OFFSET', instruction: 'Enter "=OFFSET(B1,2,2)" in cell A1.', summary: 'OFFSET cells.', whyNeeded: 'Offsets row pointers.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_offset', expectedOutput: '=OFFSET(B1,2,2)' },
      { id: '9', title: 'CHOOSE', instruction: 'Enter "=CHOOSE(2,B1,B2,B3)" in cell A1.', summary: 'CHOOSE index.', whyNeeded: 'Retrieves items by index.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_choose', expectedOutput: '=CHOOSE(2,B1,B2,B3)' }
    ]
  },
  {
    projectId: 'excel-dynamic-arrays',
    environment: 'linux',
    description: 'Learn modern Excel dynamic arrays: FILTER, SORT, UNIQUE, SEQUENCE, TAKE, and DROP.',
    objective: 'Apply dynamic arrays.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'FILTER', instruction: 'Enter "=FILTER(B1:B5,C1:C5=1)" in cell A1.', summary: 'Apply FILTER.', whyNeeded: 'Filters coordinate arrays.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_filter', expectedOutput: '=FILTER(B1:B5,C1:C5=1)' },
      { id: '2', title: 'SORT', instruction: 'Enter "=SORT(B1:B5)" in cell A1.', summary: 'Apply SORT.', whyNeeded: 'Sorts list.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_sort', expectedOutput: '=SORT(B1:B5)' },
      { id: '3', title: 'SORTBY', instruction: 'Enter "=SORTBY(B1:B5,C1:C5)" in cell A1.', summary: 'Apply SORTBY.', whyNeeded: 'Sorts by index weight.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_sortby', expectedOutput: '=SORTBY(B1:B5,C1:C5)' },
      { id: '4', title: 'UNIQUE', instruction: 'Enter "=UNIQUE(B1:B5)" in cell A1.', summary: 'Apply UNIQUE.', whyNeeded: 'Returns unique.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_unique', expectedOutput: '=UNIQUE(B1:B5)' },
      { id: '5', title: 'SEQUENCE', instruction: 'Enter "=SEQUENCE(5,1)" in cell A1.', summary: 'Apply SEQUENCE.', whyNeeded: 'Generates sequences.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_sequence', expectedOutput: '=SEQUENCE(5,1)' },
      { id: '6', title: 'RANDARRAY', instruction: 'Enter "=RANDARRAY(5,1)" in cell A1.', summary: 'Apply RANDARRAY.', whyNeeded: 'Generates random values.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_randarray', expectedOutput: '=RANDARRAY(5,1)' },
      { id: '7', title: 'TAKE', instruction: 'Enter "=TAKE(B1:B5,2)" in cell A1.', summary: 'Apply TAKE.', whyNeeded: 'Extracts rows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_take', expectedOutput: '=TAKE(B1:B5,2)' },
      { id: '8', title: 'DROP', instruction: 'Enter "=DROP(B1:B5,1)" in cell A1.', summary: 'Apply DROP.', whyNeeded: 'Drops elements.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_drop', expectedOutput: '=DROP(B1:B5,1)' },
      { id: '9', title: 'CHOOSECOLS', instruction: 'Enter "=CHOOSECOLS(B1:D5,1)" in cell A1.', summary: 'Apply CHOOSECOLS.', whyNeeded: 'Selects columns.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_choosecols', expectedOutput: '=CHOOSECOLS(B1:D5,1)' },
      { id: '10', title: 'CHOOSEROWS', instruction: 'Enter "=CHOOSEROWS(B1:D5,1)" in cell A1.', summary: 'Apply CHOOSEROWS.', whyNeeded: 'Selects rows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'func_chooserows', expectedOutput: '=CHOOSEROWS(B1:D5,1)' }
    ]
  },
  {
    projectId: 'excel-tables',
    environment: 'linux',
    description: 'Create tables, format layouts, use structured references, sort, filter, and apply slicers.',
    objective: 'Configure Excel Tables.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Creating tables', instruction: 'Enter "Table Header" in cell A1.', summary: 'Initialize table.', whyNeeded: 'Configures database schemas.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'table_create', expectedOutput: 'Table Header' },
      { id: '2', title: 'Table formatting', instruction: 'Enter "Formatted Table" in cell A1.', summary: 'Apply table style.', whyNeeded: 'Formatting highlights columns.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'table_format', expectedOutput: 'Formatted Table' },
      { id: '3', title: 'Structured references', instruction: 'Enter "=[@Sales]" in cell A1.', summary: 'Add structured reference.', whyNeeded: 'References column names.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'table_refs', expectedOutput: '=[@Sales]' },
      { id: '4', title: 'Sorting', instruction: 'Enter "Sorted Data" in cell A1.', summary: 'Sort rows.', whyNeeded: 'Sorts values.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'table_sort', expectedOutput: 'Sorted Data' },
      { id: '5', title: 'Filtering', instruction: 'Enter "Filtered Rows" in cell A1.', summary: 'Filter table.', whyNeeded: 'Isolates rows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'table_filter', expectedOutput: 'Filtered Rows' },
      { id: '6', title: 'Total rows', instruction: 'Enter "Total Row Added" in cell A1.', summary: 'Apply total row.', whyNeeded: 'Aggregates totals.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'table_totals', expectedOutput: 'Total Row Added' },
      { id: '7', title: 'Table slicers', instruction: 'Enter "Slicers Enabled" in cell A1.', summary: 'Enable table slicers.', whyNeeded: 'Filter dashboards.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'table_slicers', expectedOutput: 'Slicers Enabled' }
    ]
  },
  {
    projectId: 'excel-charts',
    environment: 'linux',
    description: 'Create column, bar, pie, line, area, combo, and sparkline charts for dashboards.',
    objective: 'Complete spreadsheet charting assignments.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'Column charts', instruction: 'Enter "Column Chart" in A1.', summary: 'Setup column chart.', whyNeeded: 'Shows intervals.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'chart_column', expectedOutput: 'Column Chart' },
      { id: '2', title: 'Bar charts', instruction: 'Enter "Bar Chart" in A1.', summary: 'Setup bar chart.', whyNeeded: 'Compares items.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'chart_bar', expectedOutput: 'Bar Chart' },
      { id: '3', title: 'Pie charts', instruction: 'Enter "Pie Chart" in A1.', summary: 'Setup pie chart.', whyNeeded: 'Shows proportions.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'chart_pie', expectedOutput: 'Pie Chart' },
      { id: '4', title: 'Line charts', instruction: 'Enter "Line Chart" in A1.', summary: 'Setup line chart.', whyNeeded: 'Shows trends.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'chart_line', expectedOutput: 'Line Chart' },
      { id: '5', title: 'Area charts', instruction: 'Enter "Area Chart" in A1.', summary: 'Setup area chart.', whyNeeded: 'Highlights volume.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'chart_area', expectedOutput: 'Area Chart' },
      { id: '6', title: 'Scatter plots', instruction: 'Enter "Scatter Plot" in A1.', summary: 'Setup scatter plot.', whyNeeded: 'Shows regression.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'chart_scatter', expectedOutput: 'Scatter Plot' },
      { id: '7', title: 'Combo charts', instruction: 'Enter "Combo Chart" in A1.', summary: 'Setup combo chart.', whyNeeded: 'Plots secondary axes.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'chart_combo', expectedOutput: 'Combo Chart' },
      { id: '8', title: 'Sparklines', instruction: 'Enter "Sparklines" in A1.', summary: 'Add sparklines.', whyNeeded: 'Inline visual trends.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'chart_sparklines', expectedOutput: 'Sparklines' },
      { id: '9', title: 'Chart formatting', instruction: 'Enter "Chart Customization" in A1.', summary: 'Format chart styles.', whyNeeded: 'Enhances reports.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'chart_format', expectedOutput: 'Chart Customization' },
      { id: '10', title: 'Dashboards', instruction: 'Enter "Executive Dashboard" in A1.', summary: 'Assemble dashboard.', whyNeeded: 'Aggregates visual segments.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'chart_dashboards', expectedOutput: 'Executive Dashboard' }
    ]
  },
  {
    projectId: 'excel-pivottables',
    environment: 'linux',
    description: 'Group data, create calculated fields, apply slicers, and refresh data source tables.',
    objective: 'Complete PivotTables analytics roadmap.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Creating PivotTables', instruction: 'Enter "Pivot Created" in A1.', summary: 'Create PivotTable.', whyNeeded: 'Aggregates fields.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pivot_create', expectedOutput: 'Pivot Created' },
      { id: '2', title: 'Grouping data', instruction: 'Enter "Grouped Pivot" in A1.', summary: 'Group columns.', whyNeeded: 'Rolls up time scales.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pivot_group', expectedOutput: 'Grouped Pivot' },
      { id: '3', title: 'Calculated fields', instruction: 'Enter "Calculated Field" in A1.', summary: 'Add calculation.', whyNeeded: 'Calculates fields dynamic math.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pivot_calc_fields', expectedOutput: 'Calculated Field' },
      { id: '4', title: 'PivotCharts', instruction: 'Enter "PivotChart" in A1.', summary: 'Setup PivotChart.', whyNeeded: 'Visualizes grouped arrays.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pivot_charts', expectedOutput: 'PivotChart' },
      { id: '5', title: 'Slicers', instruction: 'Enter "Pivot Slicers" in A1.', summary: 'Add slicers.', whyNeeded: 'Interactively filter reports.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pivot_slicers', expectedOutput: 'Pivot Slicers' },
      { id: '6', title: 'Timelines', instruction: 'Enter "Pivot Timelines" in A1.', summary: 'Add timelines.', whyNeeded: 'Filters dates.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pivot_timelines', expectedOutput: 'Pivot Timelines' },
      { id: '7', title: 'Refreshing PivotTables', instruction: 'Enter "Pivot Refreshed" in A1.', summary: 'Refresh connections.', whyNeeded: 'Pulls current source data.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pivot_refresh', expectedOutput: 'Pivot Refreshed' }
    ]
  },
  {
    projectId: 'excel-data-analysis',
    environment: 'linux',
    description: 'Learn duplicates removal, text-to-columns, Goal Seek, Solver, and scenario manager What-Ifs.',
    objective: 'Apply advanced Excel data analysis techniques.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Sort', instruction: 'Enter "Sorted Range" in A1.', summary: 'Order grid.', whyNeeded: 'Orders indexes.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'analysis_sort', expectedOutput: 'Sorted Range' },
      { id: '2', title: 'Filter', instruction: 'Enter "Filtered Range" in A1.', summary: 'Filter grid.', whyNeeded: 'Hides rows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'analysis_filter', expectedOutput: 'Filtered Range' },
      { id: '3', title: 'Advanced Filter', instruction: 'Enter "Advanced Filter" in A1.', summary: 'Setup advanced filter.', whyNeeded: 'Applies criteria ranges.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'analysis_adv_filter', expectedOutput: 'Advanced Filter' },
      { id: '4', title: 'Remove Duplicates', instruction: 'Enter "Unique List" in A1.', summary: 'Deduplicate rows.', whyNeeded: 'Purges identical lines.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'analysis_rem_dups', expectedOutput: 'Unique List' },
      { id: '5', title: 'Text to Columns', instruction: 'Enter "Split Columns" in A1.', summary: 'Trigger split.', whyNeeded: 'Divides CSV text.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'analysis_text_cols', expectedOutput: 'Split Columns' },
      { id: '6', title: 'Flash Fill', instruction: 'Enter "Flash Fill Run" in A1.', summary: 'Predict pattern.', whyNeeded: 'Fills patterns automatically.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'analysis_flash_fill', expectedOutput: 'Flash Fill Run' },
      { id: '7', title: 'Goal Seek', instruction: 'Enter "Goal Seek OK" in A1.', summary: 'Run Goal Seek.', whyNeeded: 'Back-solves target inputs.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'analysis_goal_seek', expectedOutput: 'Goal Seek OK' },
      { id: '8', title: 'Scenario Manager', instruction: 'Enter "Scenario Added" in A1.', summary: 'Define scenarios.', whyNeeded: 'Compares what-if matrices.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'analysis_scenario', expectedOutput: 'Scenario Added' },
      { id: '9', title: 'Solver', instruction: 'Enter "Solver Optim" in A1.', summary: 'Configure Solver.', whyNeeded: 'Solves complex variables.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'analysis_solver', expectedOutput: 'Solver Optim' },
      { id: '10', title: 'What-If Analysis', instruction: 'Enter "What-If Data" in A1.', summary: 'Create What-If Table.', whyNeeded: 'Builds sensitivity arrays.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'analysis_whatif', expectedOutput: 'What-If Data' }
    ]
  },
  {
    projectId: 'excel-data-validation',
    environment: 'linux',
    description: 'Configure drop-down lists, custom validation limits, input tips, and error alerts.',
    objective: 'Master Excel data validation workflows.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Drop-down lists', instruction: 'Enter "Dropdown OK" in A1.', summary: 'Configure dropdown list.', whyNeeded: 'Restricts user choices.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'val_dropdown', expectedOutput: 'Dropdown OK' },
      { id: '2', title: 'Custom validation', instruction: 'Enter "Custom Limits" in A1.', summary: 'Add validation rule.', whyNeeded: 'Applies logic validation.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'val_custom', expectedOutput: 'Custom Limits' },
      { id: '3', title: 'Error alerts', instruction: 'Enter "Error Message" in A1.', summary: 'Set alert warning.', whyNeeded: 'Warns bad entries.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'val_errors', expectedOutput: 'Error Message' },
      { id: '4', title: 'Input messages', instruction: 'Enter "Input Tips" in A1.', summary: 'Add guidance note.', whyNeeded: 'Instructs operators beforehand.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'val_messages', expectedOutput: 'Input Tips' },
      { id: '5', title: 'Dependent drop-down lists', instruction: 'Enter "Dependent OK" in A1.', summary: 'Build dynamic dropdown.', whyNeeded: 'Cascades choices.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'val_dependent', expectedOutput: 'Dependent OK' }
    ]
  },
  {
    projectId: 'excel-conditional-formatting',
    environment: 'linux',
    description: 'Define highlight rules, data bars, color scales, icon sets, and formula rules.',
    objective: 'Apply conditional format highlights.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'Highlight rules', instruction: 'Enter "High Margin" in A1.', summary: 'Apply highlight rule.', whyNeeded: 'Highlights top ranges.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cond_highlight', expectedOutput: 'High Margin' },
      { id: '2', title: 'Data bars', instruction: 'Enter "Data Bars" in A1.', summary: 'Apply data bars.', whyNeeded: 'Fills visual bars.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cond_bars', expectedOutput: 'Data Bars' },
      { id: '3', title: 'Color scales', instruction: 'Enter "Color Scale" in A1.', summary: 'Apply color scale.', whyNeeded: 'Maps temperature scales.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cond_scales', expectedOutput: 'Color Scale' },
      { id: '4', title: 'Icon sets', instruction: 'Enter "Icon Sets" in A1.', summary: 'Apply icons.', whyNeeded: 'Displays trend arrows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cond_icons', expectedOutput: 'Icon Sets' },
      { id: '5', title: 'Formula-based rules', instruction: 'Enter "=A2>100" in A1.', summary: 'Apply formula rule.', whyNeeded: 'Triggers formatting dynamically.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cond_formula', expectedOutput: '=A2>100' },
      { id: '6', title: 'Duplicate values', instruction: 'Enter "Dup Flag" in A1.', summary: 'Highlight duplicates.', whyNeeded: 'Finds identical values.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'cond_duplicates', expectedOutput: 'Dup Flag' }
    ]
  },
  {
    projectId: 'excel-power-query',
    environment: 'linux',
    description: 'Import data, clean records, merge queries, append tables, and transform sources.',
    objective: 'Build ETL pipelines with Power Query.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Import data', instruction: 'Enter "Import Setup" in A1.', summary: 'Initialize load.', whyNeeded: 'Connects data source feeds.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pq_import', expectedOutput: 'Import Setup' },
      { id: '2', title: 'Clean data', instruction: 'Enter "Clean Query" in A1.', summary: 'Transform types.', whyNeeded: 'Purges formatting errors.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pq_clean', expectedOutput: 'Clean Query' },
      { id: '3', title: 'Merge queries', instruction: 'Enter "Merged Tables" in A1.', summary: 'Run query joins.', whyNeeded: 'Connects separate tables.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pq_merge', expectedOutput: 'Merged Tables' },
      { id: '4', title: 'Append queries', instruction: 'Enter "Appended Tables" in A1.', summary: 'Union data rows.', whyNeeded: 'Appends vertical rows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pq_append', expectedOutput: 'Appended Tables' },
      { id: '5', title: 'Transform data', instruction: 'Enter "Transformed Source" in A1.', summary: 'Apply pivots.', whyNeeded: 'Aggregates key columns.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pq_transform', expectedOutput: 'Transformed Source' },
      { id: '6', title: 'Refresh queries', instruction: 'Enter "Query Refresh" in A1.', summary: 'Trigger refresh.', whyNeeded: 'Syncs live values.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pq_refresh', expectedOutput: 'Query Refresh' }
    ]
  },
  {
    projectId: 'excel-power-pivot',
    environment: 'linux',
    description: 'Design Data Models, create table relationships, write DAX measures, and calculated columns.',
    objective: 'Construct Power Pivot databases.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Data Model', instruction: 'Enter "Data Model OK" in A1.', summary: 'Configure schema.', whyNeeded: 'Binds relational records.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pp_model', expectedOutput: 'Data Model OK' },
      { id: '2', title: 'Relationships', instruction: 'Enter "Rel-1-Many" in A1.', summary: 'Add relationships.', whyNeeded: 'Maps primary keys.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pp_relations', expectedOutput: 'Rel-1-Many' },
      { id: '3', title: 'Measures', instruction: 'Enter "DAX Total" in A1.', summary: 'Define DAX measure.', whyNeeded: 'Aggregates dynamic scores.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pp_measures', expectedOutput: 'DAX Total' },
      { id: '4', title: 'Calculated columns', instruction: 'Enter "Calc Column" in A1.', summary: 'Add custom columns.', whyNeeded: 'Enriches static rows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pp_calc_cols', expectedOutput: 'Calc Column' },
      { id: '5', title: 'DAX basics', instruction: 'Enter "=SUM(Sales)" in A1.', summary: 'Write baseline DAX.', whyNeeded: 'Formulates basic aggregates.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'pp_dax', expectedOutput: '=SUM(Sales)' }
    ]
  },
  {
    projectId: 'excel-financial',
    environment: 'linux',
    description: 'Compute amortization (PMT), net present value (NPV), IRR, FV, and PV formulas.',
    objective: 'Complete core finance modeling tasks.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'PMT', instruction: 'Type "=PMT(0.05/12,60,-15000)" in cell A1.', summary: 'Amortize loan.', whyNeeded: 'Solves monthly bill.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fin_pmt', expectedOutput: '=PMT(0.05/12,60,-15000)' },
      { id: '2', title: 'NPV', instruction: 'Type "=NPV(0.08,B1:B5)" in cell A1.', summary: 'Solve net values.', whyNeeded: 'Solves capital returns.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fin_npv', expectedOutput: '=NPV(0.08,B1:B5)' },
      { id: '3', title: 'IRR', instruction: 'Type "=IRR(B1:B5)" in cell A1.', summary: 'Find yield rate.', whyNeeded: 'Calculates break-even yields.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fin_irr', expectedOutput: '=IRR(B1:B5)' },
      { id: '4', title: 'FV', instruction: 'Type "=FV(0.05,10,0,-1000)" in cell A1.', summary: 'Calculate future cash.', whyNeeded: 'Compounds savings values.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fin_fv', expectedOutput: '=FV(0.05,10,0,-1000)' },
      { id: '5', title: 'PV', instruction: 'Type "=PV(0.05,10,100)" in cell A1.', summary: 'Discount future yields.', whyNeeded: 'Checks cash layouts value today.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fin_pv', expectedOutput: '=PV(0.05,10,100)' },
      { id: '6', title: 'RATE', instruction: 'Type "=RATE(60,-300,15000)" in cell A1.', summary: 'Solve compound rate.', whyNeeded: 'Finds loan rates.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fin_rate', expectedOutput: '=RATE(60,-300,15000)' },
      { id: '7', title: 'XNPV', instruction: 'Type "=XNPV(0.08,B1:B5,C1:C5)" in cell A1.', summary: 'Discount irregular cash.', whyNeeded: 'Accounts for dates spacing.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fin_xnpv', expectedOutput: '=XNPV(0.08,B1:B5,C1:C5)' },
      { id: '8', title: 'XIRR', instruction: 'Type "=XIRR(B1:B5,C1:C5)" in cell A1.', summary: 'IRR on exact dates.', whyNeeded: 'Authenticates cash timing yields.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'fin_xirr', expectedOutput: '=XIRR(B1:B5,C1:C5)' }
    ]
  },
  {
    projectId: 'excel-statistical',
    environment: 'linux',
    description: 'Learn MEDIAN, MODE, standard deviations, percentiles, rankings, and correlations.',
    objective: 'Conduct basic statistical analysis.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'MEDIAN', instruction: 'Type "=MEDIAN(A2:A5)" in A1.', summary: 'Solve central median.', whyNeeded: 'Isolates middle values.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'stat_median', expectedOutput: '=MEDIAN(A2:A5)' },
      { id: '2', title: 'MODE', instruction: 'Type "=MODE(A2:A5)" in A1.', summary: 'Check frequency.', whyNeeded: 'Identifies repeats.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'stat_mode', expectedOutput: '=MODE(A2:A5)' },
      { id: '3', title: 'STDEV', instruction: 'Type "=STDEV(A2:A5)" in A1.', summary: 'Get standard dev.', whyNeeded: 'Measures dispersion.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'stat_stdev', expectedOutput: '=STDEV(A2:A5)' },
      { id: '4', title: 'VAR', instruction: 'Type "=VAR(A2:A5)" in A1.', summary: 'Get variance.', whyNeeded: 'Evaluates deviations.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'stat_var', expectedOutput: '=VAR(A2:A5)' },
      { id: '5', title: 'PERCENTILE', instruction: 'Type "=PERCENTILE(A2:A5,0.9)" in A1.', summary: 'Solve top deciles.', whyNeeded: 'Filters outliers.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'stat_percentile', expectedOutput: '=PERCENTILE(A2:A5,0.9)' },
      { id: '6', title: 'QUARTILE', instruction: 'Type "=QUARTILE(A2:A5,1)" in A1.', summary: 'Get quartile index.', whyNeeded: 'Groups lists.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'stat_quartile', expectedOutput: '=QUARTILE(A2:A5,1)' },
      { id: '7', title: 'RANK', instruction: 'Type "=RANK(B1,A2:A5)" in A1.', summary: 'Rank value index.', whyNeeded: 'Calculates standings.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'stat_rank', expectedOutput: '=RANK(B1,A2:A5)' },
      { id: '8', title: 'CORREL', instruction: 'Type "=CORREL(B1:B5,C1:C5)" in A1.', summary: 'Solve correlation.', whyNeeded: 'Evaluates linear dependencies.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'stat_correl', expectedOutput: '=CORREL(B1:B5,C1:C5)' }
    ]
  },
  {
    projectId: 'excel-advanced-formulas',
    environment: 'linux',
    description: 'Write nested IF operations, LAMBDA and LET definitions, named ranges, and INDIRECT formulas.',
    objective: 'Complete advanced formula design tasks.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Nested IF statements', instruction: 'Type "=IF(B1>90,\"A\",IF(B1>80,\"B\",\"C\"))" in cell A1.', summary: 'Add nested logic.', whyNeeded: 'Resolves multiple conditions.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'adv_nested_if', expectedOutput: '=IF(B1>90,"A",IF(B1>80,"B","C"))' },
      { id: '2', title: 'Array formulas', instruction: 'Type "=SUM(B1:B5*C1:C5)" in cell A1.', summary: 'Add array formula.', whyNeeded: 'Runs math over cell matrices.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'adv_arrays', expectedOutput: '=SUM(B1:B5*C1:C5)' },
      { id: '3', title: 'Named ranges', instruction: 'Enter "TaxRate" in cell A1 to define range labels.', summary: 'Set named range label.', whyNeeded: 'Translates cell coords into legible names.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'adv_named_ranges', expectedOutput: 'TaxRate' },
      { id: '4', title: 'LET', instruction: 'Type "=LET(x,5,x+1)" in cell A1.', summary: 'Assign variables.', whyNeeded: 'Reduces recalculation times.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'adv_let', expectedOutput: '=LET(x,5,x+1)' },
      { id: '5', title: 'LAMBDA', instruction: 'Type "=LAMBDA(X,X+1)" in cell A1.', summary: 'Define LAMBDA.', whyNeeded: 'Makes spreadsheet code modular.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'adv_lambda', expectedOutput: '=LAMBDA(X,X+1)' },
      { id: '6', title: 'INDIRECT', instruction: 'Type "=INDIRECT(B1)" in cell A1.', summary: 'Add indirect address.', whyNeeded: 'Redirects formula references.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'adv_indirect', expectedOutput: '=INDIRECT(B1)' },
      { id: '7', title: 'AGGREGATE', instruction: 'Type "=AGGREGATE(9,6,B1:B5)" in cell A1.', summary: 'Run aggregate sum.', whyNeeded: 'Bypasses hidden lines or errors.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'adv_aggregate', expectedOutput: '=AGGREGATE(9,6,B1:B5)' },
      { id: '8', title: 'SUMPRODUCT', instruction: 'Type "=SUMPRODUCT(B1:B5,C1:C5)" in cell A1.', summary: 'Sum row products.', whyNeeded: 'Multiplies vectors.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'adv_sumproduct', expectedOutput: '=SUMPRODUCT(B1:B5,C1:C5)' }
    ]
  },
  {
    projectId: 'excel-automation',
    environment: 'linux',
    description: 'Record macros, edit scripts, write VBA procedures, loops, variables, and user forms.',
    objective: 'Master VBA and sheet automation controls.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Recording Macros', instruction: 'Enter "Macro Record" in A1 to trigger recording.', summary: 'Record macro.', whyNeeded: 'Captures UI flows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'macro_record', expectedOutput: 'Macro Record' },
      { id: '2', title: 'Editing Macros', instruction: 'Enter "VBA Code Updated" in A1.', summary: 'Edit VBA.', whyNeeded: 'Cleans code scripts.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'macro_edit', expectedOutput: 'VBA Code Updated' },
      { id: '3', title: 'VBA basics', instruction: 'Enter "Sub Run()" in A1.', summary: 'Write VBA module.', whyNeeded: 'Starts program routines.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'macro_vba', expectedOutput: 'Sub Run()' },
      { id: '4', title: 'Loops', instruction: 'Enter "For Each Cell" in A1.', summary: 'Add VBA loops.', whyNeeded: 'Processes ranges dynamically.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'macro_loops', expectedOutput: 'For Each Cell' },
      { id: '5', title: 'Variables', instruction: 'Enter "Dim x As Integer" in A1.', summary: 'Declare VBA vars.', whyNeeded: 'Reserves system memory.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'macro_vars', expectedOutput: 'Dim x As Integer' },
      { id: '6', title: 'UserForms', instruction: 'Enter "Form Displayed" in A1.', summary: 'Create userform.', whyNeeded: 'Builds custom panels.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'macro_forms', expectedOutput: 'Form Displayed' },
      { id: '7', title: 'Event procedures', instruction: 'Enter "SheetChange Event" in A1.', summary: 'Define event triggers.', whyNeeded: 'Automates responses.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'macro_events', expectedOutput: 'SheetChange Event' }
    ]
  },
  {
    projectId: 'excel-collaboration',
    environment: 'linux',
    description: 'Add comments, configure sharing rules, protect workbooks, and view version history.',
    objective: 'Coordinate workbook sharing.',
    missionNumber: 1, totalMissions: 1, xpReward: 150,
    steps: [
      { id: '1', title: 'Comments', instruction: 'Enter "Feedback Added" in A1.', summary: 'Comment cell.', whyNeeded: 'Logs feedback.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'collab_comments', expectedOutput: 'Feedback Added' },
      { id: '2', title: 'Notes', instruction: 'Enter "Reference Note" in A1.', summary: 'Add note.', whyNeeded: 'Documents formulas.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'collab_notes', expectedOutput: 'Reference Note' },
      { id: '3', title: 'Co-authoring', instruction: 'Enter "Session Sync" in A1.', summary: 'Activate sync.', whyNeeded: 'Saves edits live.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'collab_coauthor', expectedOutput: 'Session Sync' },
      { id: '4', title: 'Sharing workbooks', instruction: 'Enter "Link Shared" in A1.', summary: 'Share link.', whyNeeded: 'Invites remote editors.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'collab_share', expectedOutput: 'Link Shared' },
      { id: '5', title: 'Version history', instruction: 'Enter "v1.2 Restored" in A1.', summary: 'Check history.', whyNeeded: 'Recovers corrupt sheets.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'collab_version', expectedOutput: 'v1.2 Restored' },
      { id: '6', title: 'Protect workbook', instruction: 'Enter "Structure Locked" in A1.', summary: 'Lock sheets.', whyNeeded: 'Prevents tab deletions.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'collab_protect', expectedOutput: 'Structure Locked' },
      { id: '7', title: 'Track changes', instruction: 'Enter "Changes Logged" in A1.', summary: 'Audit edits.', whyNeeded: 'Reviews operator cells.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'collab_track', expectedOutput: 'Changes Logged' }
    ]
  },
  {
    projectId: 'excel-import-export',
    environment: 'linux',
    description: 'Sync CSV, XML, PDF, Web Data, and SQL databases into your workbook pages.',
    objective: 'Complete import and export configurations.',
    missionNumber: 1, totalMissions: 1, xpReward: 200,
    steps: [
      { id: '1', title: 'CSV files', instruction: 'Enter "Import CSV" in A1.', summary: 'Sync CSV file.', whyNeeded: 'Feeds basic rows.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'io_csv', expectedOutput: 'Import CSV' },
      { id: '2', title: 'Text files', instruction: 'Enter "Parse Text" in A1.', summary: 'Sync TXT file.', whyNeeded: 'Imports legacy logs.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'io_txt', expectedOutput: 'Parse Text' },
      { id: '3', title: 'XML', instruction: 'Enter "XML Mapping" in A1.', summary: 'Load XML schema.', whyNeeded: 'Interacts with APIs.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'io_xml', expectedOutput: 'XML Mapping' },
      { id: '4', title: 'PDF', instruction: 'Enter "Print PDF" in A1.', summary: 'Export PDF.', whyNeeded: 'Saves reports offline.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'io_pdf', expectedOutput: 'Print PDF' },
      { id: '5', title: 'Web data', instruction: 'Enter "API Sync" in A1.', summary: 'Fetch URL.', whyNeeded: 'Loads web constants.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'io_web', expectedOutput: 'API Sync' },
      { id: '6', title: 'Database connections', instruction: 'Enter "SQL Query" in A1.', summary: 'Query SQL server.', whyNeeded: 'Syncs live columns.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'io_db', expectedOutput: 'SQL Query' }
    ]
  },
  {
    projectId: 'excel-printing',
    environment: 'linux',
    description: 'Define print areas, add custom header titles, page setups, scaling, and breaks.',
    objective: 'Prepare sheet margins for print routing.',
    missionNumber: 1, totalMissions: 1, xpReward: 150,
    steps: [
      { id: '1', title: 'Print area', instruction: 'Enter "Print Range Set" in A1.', summary: 'Limit print cells.', whyNeeded: 'Saves page space.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'print_area', expectedOutput: 'Print Range Set' },
      { id: '2', title: 'Headers and footers', instruction: 'Enter "Header Title" in A1.', summary: 'Set header title.', whyNeeded: 'Adds page numbers.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'print_headers', expectedOutput: 'Header Title' },
      { id: '3', title: 'Page setup', instruction: 'Enter "Landscape Mode" in A1.', summary: 'Set layout.', whyNeeded: 'Fits wide datasets.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'print_setup', expectedOutput: 'Landscape Mode' },
      { id: '4', title: 'Scaling', instruction: 'Enter "Fit to 1 Page" in A1.', summary: 'Scale layout.', whyNeeded: 'Prevents vertical spill.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'print_scaling', expectedOutput: 'Fit to 1 Page' },
      { id: '5', title: 'Page breaks', instruction: 'Enter "Page Breaks Set" in A1.', summary: 'Insert page break.', whyNeeded: 'Divides summaries.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'print_breaks', expectedOutput: 'Page Breaks Set' }
    ]
  },
  {
    projectId: 'excel-dashboards',
    environment: 'linux',
    description: 'Design executive dashboards with slicers, timelines, dynamic charts, and KPIs.',
    objective: 'Develop high-performance executive dashboards.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'KPI dashboards', instruction: 'Enter "KPI Widget" in A1.', summary: 'Assemble KPI widget.', whyNeeded: 'Tracks key metrics.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'dash_kpi', expectedOutput: 'KPI Widget' },
      { id: '2', title: 'Interactive dashboards', instruction: 'Enter "Interactive Mode" in A1.', summary: 'Link filter events.', whyNeeded: 'Updates panels live.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'dash_interactive', expectedOutput: 'Interactive Mode' },
      { id: '3', title: 'Slicers', instruction: 'Enter "Dashboard Slicers" in A1.', summary: 'Setup dashboard slicers.', whyNeeded: 'Filters charts.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'dash_slicers', expectedOutput: 'Dashboard Slicers' },
      { id: '4', title: 'Timelines', instruction: 'Enter "Dashboard Timelines" in A1.', summary: 'Setup timelines.', whyNeeded: 'Filters dates.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'dash_timelines', expectedOutput: 'Dashboard Timelines' },
      { id: '5', title: 'Dynamic charts', instruction: 'Enter "Dynamic Chart" in A1.', summary: 'Add variable charts.', whyNeeded: 'Adapts sizes automatically.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'dash_charts', expectedOutput: 'Dynamic Chart' },
      { id: '6', title: 'Executive reports', instruction: 'Enter "Exec Report" in A1.', summary: 'Compile print pages.', whyNeeded: 'Summarizes parameters.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'dash_reports', expectedOutput: 'Exec Report' }
    ]
  },
  {
    projectId: 'excel-business-apps',
    environment: 'linux',
    description: 'Build enterprise expense trackers, budgets, inventory pages, and payrolls.',
    objective: 'Complete corporate spreadsheet builds.',
    missionNumber: 1, totalMissions: 1, xpReward: 250,
    steps: [
      { id: '1', title: 'Budgeting', instruction: 'Enter "Corporate Budget" in A1.', summary: 'Build budget.', whyNeeded: 'Plans overhead cash.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'biz_budget', expectedOutput: 'Corporate Budget' },
      { id: '2', title: 'Expense tracking', instruction: 'Enter "Expense Tracker" in A1.', summary: 'Build tracker.', whyNeeded: 'Monitors outlays.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'biz_expense', expectedOutput: 'Expense Tracker' },
      { id: '3', title: 'Inventory management', instruction: 'Enter "Inventory Log" in A1.', summary: 'Build inventory list.', whyNeeded: 'Tracks warehouse stocks.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'biz_inventory', expectedOutput: 'Inventory Log' },
      { id: '4', title: 'Sales reports', instruction: 'Enter "Sales Summary" in A1.', summary: 'Build sales report.', whyNeeded: 'Tracks revenue margins.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'biz_sales', expectedOutput: 'Sales Summary' },
      { id: '5', title: 'HR reporting', instruction: 'Enter "HR Roster" in A1.', summary: 'Build roster.', whyNeeded: 'Coordinates headcounts.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'biz_hr', expectedOutput: 'HR Roster' },
      { id: '6', title: 'Payroll', instruction: 'Enter "Payroll Calculator" in A1.', summary: 'Build payroll calculator.', whyNeeded: 'Computes tax brackets.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'biz_payroll', expectedOutput: 'Payroll Calculator' },
      { id: '7', title: 'Financial modeling', instruction: 'Enter "Forecast Model" in A1.', summary: 'Build finance model.', whyNeeded: 'Computes future yields.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'biz_fin_model', expectedOutput: 'Forecast Model' },
      { id: '8', title: 'Forecasting', instruction: 'Enter "Growth Predictor" in A1.', summary: 'Model regression trends.', whyNeeded: 'Forecasts cash curves.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'biz_forecast', expectedOutput: 'Growth Predictor' },
      { id: '9', title: 'Project management', instruction: 'Enter "Gantt Timeline" in A1.', summary: 'Build Gantt chart.', whyNeeded: 'Manages milestone dates.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'biz_pm', expectedOutput: 'Gantt Timeline' },
      { id: '10', title: 'Risk analysis', instruction: 'Enter "Risk Registry" in A1.', summary: 'Build risk registry.', whyNeeded: 'Assesses project threats.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'biz_risk', expectedOutput: 'Risk Registry' }
    ]
  },
  {
    projectId: 'excel-advanced-analytics',
    environment: 'linux',
    description: 'Run linear regressions, trend analysis, forecasts, and Monte Carlo simulations.',
    objective: 'Complete advanced analytics and simulations.',
    missionNumber: 1, totalMissions: 1, xpReward: 300,
    steps: [
      { id: '1', title: 'Regression', instruction: 'Enter "Regression OK" in A1.', summary: 'Conduct linear regression.', whyNeeded: 'Maps variables correlation.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'an_regression', expectedOutput: 'Regression OK' },
      { id: '2', title: 'Forecasting', instruction: 'Enter "Forecast OK" in A1.', summary: 'Predict values.', whyNeeded: 'Finds seasonal variations.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'an_forecast', expectedOutput: 'Forecast OK' },
      { id: '3', title: 'Trend analysis', instruction: 'Enter "Trend OK" in A1.', summary: 'Map historical trends.', whyNeeded: 'Tracks long-term growth.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'an_trend', expectedOutput: 'Trend OK' },
      { id: '4', title: 'Monte Carlo simulation', instruction: 'Enter "Sim OK" in A1.', summary: 'Run simulation.', whyNeeded: 'Models probability distributions.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'an_monte_carlo', expectedOutput: 'Sim OK' },
      { id: '5', title: 'Data Analysis ToolPak', instruction: 'Enter "ToolPak OK" in A1.', summary: 'Enable Analysis ToolPak.', whyNeeded: 'Unlocks complex ANOVA calculators.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'an_toolpak', expectedOutput: 'ToolPak OK' },
      { id: '6', title: 'Scenario analysis', instruction: 'Enter "Scenario OK" in A1.', summary: 'Evaluate case matrix.', whyNeeded: 'Helps outline risk bands.', pillarConnection: 'Data Analysis', commands: [], checkCommand: 'an_scenario', expectedOutput: 'Scenario OK' }
    ]
  }
];
