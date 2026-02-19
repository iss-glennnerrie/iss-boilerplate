"use client"

import AppContent from '@/components/custom/app-content'
import AppCustomizer from '@/components/custom/customizer/app-customizer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'


const AppearancePage = () => {
    return (
       <AppContent title="Appearance" description="Change your theme here as you wish">
            <div className="grid grid-cols-12 xl:gap-6">
                <div className="xl:col-span-4 col-span-12">
                    <AppCustomizer/>
                </div>
                <div className="xl:col-span-8 col-span-12">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                            <CardDescription>This is how your system will look likes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg grid grid-cols-12 h-[40vh]">
                                <div className="col-span-4  p-3 pr-6 bg-secondary rounded-lg space-y-3">
                                    <Input placeholder='Input Box'/>
                                    <Button className=''>Button</Button>
                                </div>
                                <div className="col-span-8  p-4  -ms-3 rounded-lg bg-card">
                                    <div className='font-bold text-lg'>Header</div>
                                    <div className="text-muted-foreground">Description</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
       </AppContent>
    )
}

export default AppearancePage