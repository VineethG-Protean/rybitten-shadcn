import { useAtom } from "jotai";
import { cubes } from "rybitten/cubes";

import { RYBITTEN_PARAMS_ATOM } from "@/lib/atom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export default function RybittenControls() {
  const [params, setParams] = useAtom(RYBITTEN_PARAMS_ATOM);

  const handleUpdateParams = (
    value: number[] | string | boolean,
    type: string
  ) => {
    setParams((prev) => ({
      ...prev,
      [type]:
        typeof value === "boolean" || typeof value === "string"
          ? value
          : Array.isArray(value)
          ? value[0]
          : undefined,
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <Select
        onValueChange={(e) => handleUpdateParams(e, "type")}
        defaultValue="itten"
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {[...cubes.entries()].map(([key, val]) => (
            <SelectItem key={key} value={key}>
              {val.title} - {key}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold">Amount - {params.amount}</p>
          <Slider
            onValueChange={(e) => handleUpdateParams(e, "amount")}
            defaultValue={[params.amount]}
            max={30}
            step={1}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold">Saturation - {params.s}</p>
          <Slider
            onValueChange={(e) => handleUpdateParams(e, "s")}
            defaultValue={[params.s]}
            max={1}
            step={0.1}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold">Luminosity - {params.l}</p>
          <Slider
            onValueChange={(e) => handleUpdateParams(e, "l")}
            defaultValue={[params.l]}
            max={1}
            step={0.1}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold">Factor - {params.hFn}</p>
          <Slider
            onValueChange={(e) => handleUpdateParams(e, "hFn")}
            defaultValue={[params.hFn]}
            max={10}
            step={1}
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs font-bold">Old Scool</p>
          <Switch
            onCheckedChange={(e) => handleUpdateParams(e, "oldScool")}
            defaultChecked={params.oldScool}
          />
        </div>
      </div>
    </div>
  );
}
