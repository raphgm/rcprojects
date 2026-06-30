import { projects } from '../src/data/projects';
import { learningPaths } from '../src/data/learningPaths';

console.log("=== Power BI Projects ===");
const pbi = projects.filter(p => p.category === 'Power BI');
console.log(`Count: ${pbi.length}`);
console.log(pbi.map(p => `${p.id}: ${p.title} (${p.category})`));

console.log("=== All categories in projects ===");
const cats = Array.from(new Set(projects.map(p => p.category)));
console.log(cats);
