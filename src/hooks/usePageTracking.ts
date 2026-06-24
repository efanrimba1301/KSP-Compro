import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

function detectDeviceType(): 'desktop' | 'mobile' {
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    return isMobile ? 'mobile' : 'desktop'
}

export function usePageTracking(pagePath: string = '/') {

    useEffect(() => {
        const trackVisit = async () => {
            try {

                const { data: { session } } = await supabase.auth.getSession()
                if (session) {
                    console.log('[page-tracking] user sudah login, tidak melakukan tracking')
                    return;
                }
                const deviceType = detectDeviceType()

                const { error } = await supabase.from('page_views').insert({
                    page_path: pagePath,
                    device_type: deviceType,
                })

                if (error) {
                    console.error('[page-tracking] error saat menyimpan kunjungan:', error.message)
                }
            } catch (err) {
                console.error('[page-tracking] error tidak tertangani saat menyimpan kunjungan:', err)
            }
        }

        trackVisit()

    }, [pagePath])
}