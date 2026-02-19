import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/hooks/layout/use-theme-store";
import { Check, PaintBucket } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
const AppCustomizer = () => {
    const { theme, setTheme } = useThemeStore();
    const [color, setColor] = useState(theme ?? "#09090b");
    // const fontSizes = ["text-xs", "text-sm", "text-md", "text-lg", "text-xl", "text-2xl"];

    const hexes = ["#09090b","#d4d4d8", "#155dfc", "#615fff", "#fb2c36", "#fe9a00", "#10B981"];
    const handleColorChange = (newColor: string) => {
        setColor(newColor);
        setTheme(newColor);
    };
    return (
        <div className="space-y-3">
            <div className="">
                <div className="font-bold">Theme</div>
                <div className="text-muted-foreground">Choose the theme that fits your vibe 😎</div>
                <div className="border rounded-lg p-4 mt-3 mb-3 flex items-center hover:bg-secondary">
                    <AnimatedThemeToggler /> 
                    <div className="ms-4 "> Toggle the icon to switch to <b>Light</b>  or <b> Dark</b> mode.</div>
                </div>
            </div>
            <div className="p-1"></div>
            <Tabs defaultValue="solid">
                <TabsList>
                    <TabsTrigger value="solid">Solid Color</TabsTrigger>
                    <TabsTrigger value="custom">Custom</TabsTrigger>
                </TabsList>
                <TabsContent value="solid" className="p-3">
                    <div className="text-muted-foreground mb-3">Start by selecting one of our default solid colors</div>
                    <div className="grid grid-cols-7 gap-3 w-full">
                        {hexes.map((hex) => (
                            <Button
                                key={hex}
                                className="rounded-full w-10 h-10 p-0 border"
                                style={{ backgroundColor: hex }}
                                onClick={() => handleColorChange(hex)}
                            >
                                {hex === color && <Check className="h-4 w-4" />}
                            </Button>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="custom" className="p-3">
                    <div className="text-muted-foreground mb-3">Need a specific shade? Use the color picker to create your own</div>
                    <div className="w-full">
                        <HexColorPicker
                            color={color}
                            onChange={handleColorChange}
                            style={{
                                height: "17dvh",
                                width: "100%",
                            }}
                        />
                        <div className="text-start flex flex-col mt-3">
                            <div className="text-muted-foreground">Or type your hex code here</div>

                            <HexColorInput color={color} onChange={handleColorChange} className="border p-2 text-sm rounded-lg text-center" />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AppCustomizer;
