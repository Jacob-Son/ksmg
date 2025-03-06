import * as path from 'path';
import * as fs from 'fs';
import { ethers } from 'ethers';

export function abiPathToIface(_abiPath: string): ethers.Interface {
  const abiPath = path.join(_abiPath);
  const abiObject = JSON.parse(fs.readFileSync(abiPath).toString());
  const abi = abiObject;
  const iface = new ethers.Interface(abi);
  return iface;
}
