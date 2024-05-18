import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

export function Match(property: string, validationOptions?: ValidationOptions) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: "Match" })
export class MatchConstraint implements ValidatorConstraintInterface {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }
}
