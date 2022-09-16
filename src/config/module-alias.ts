import * as path from 'path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '..');

moduleAlias.addAliases({
  '@modules': path.join(files, 'modules'),
  '@services': path.join(files, 'services'),
  '@infra': path.join(files, 'infra'),
  '@shared': path.join(files, 'shared'),
  '@config': path.join(files, 'config'),
});