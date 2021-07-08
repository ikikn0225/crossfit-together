

import { ObjectType,  } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";

@ObjectType()
export class LogoutOutput extends CoreOutput {}