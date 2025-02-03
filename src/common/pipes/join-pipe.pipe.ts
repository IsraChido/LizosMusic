import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "join",
})
export class JoinPipe implements PipeTransform {
    transform(
        values: (string | undefined | null)[],
        separator: string = ", ",
        noCommaAfterIndexes: number[] = []
    ): string {
        const indexedValues = values.map((v, i) => ({
            value: v?.trim(),
            index: i,
        }));

        const filteredValues = indexedValues.filter(({ value }) => value);

        if (filteredValues.length === 0) return "";

        return filteredValues.reduce(
            (acc, { value, index }, arrayIndex, array) => {
                acc += value;

                if (
                    arrayIndex < array.length - 1 &&
                    !noCommaAfterIndexes.includes(index)
                ) {
                    acc += separator;
                } else if (arrayIndex < array.length - 1) {
                    acc += " ";
                }

                return acc;
            },
            ""
        );
    }
}
