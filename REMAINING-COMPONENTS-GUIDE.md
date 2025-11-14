# Guide to Update Remaining Components

## Pattern to Follow

All components follow the same pattern:

1. **Import the action**: `import { get[Section]Section } from "@/app/actions/section-actions"`
2. **Add state**: `const [sectionData, setSectionData] = useState<any>(null)`
3. **Fetch in useEffect**:
```typescript
useEffect(() => {
  async function fetchData() {
    try {
      const result = await get[Section]Section()
      if (result.data) {
        setSectionData(result.data)
      }
    } catch (error) {
      console.error('Error fetching section:', error)
    }
  }
  fetchData()
}, [])
```
4. **Use data with fallbacks**: `{sectionData?.field || 'fallback value'}`

## Why Choose Us Section

Update `components/why-choose-us-section.tsx`:

```typescript
import { getWhyChooseUsSection } from "@/app/actions/section-actions"

// In component:
const [whyChooseUsData, setWhyChooseUsData] = useState<any>(null)

useEffect(() => {
  async function fetchData() {
    const result = await getWhyChooseUsSection()
    if (result.data) {
      setWhyChooseUsData(result.data)
    }
  }
  fetchData()
}, [])

// Use:
const advantages = whyChooseUsData?.advantages || defaultAdvantages
const testimonials = whyChooseUsData?.testimonials || defaultTestimonials
const certifications = whyChooseUsData?.certifications || defaultCertifications
```

## Contact Section

Update `components/contact-section.tsx`:

```typescript
import { getContactSection } from "@/app/actions/section-actions"

// In component:
const [contactData, setContactData] = useState<any>(null)

useEffect(() => {
  async function fetchData() {
    const result = await getContactSection()
    if (result.data) {
      setContactData(result.data)
    }
  }
  fetchData()
}, [])

// Use:
const contactInfo = contactData?.contact_info || defaultContactInfo
```

## Footer

Update `components/footer.tsx`:

```typescript
import { getFooter } from "@/app/actions/section-actions"

// In component:
const [footerData, setFooterData] = useState<any>(null)

useEffect(() => {
  async function fetchData() {
    const result = await getFooter()
    if (result.data) {
      setFooterData(result.data)
    }
  }
  fetchData()
}, [])

// Use:
const quickLinks = footerData?.quick_links || defaultQuickLinks
const services = footerData?.services || defaultServices
const legalLinks = footerData?.legal_links || defaultLegalLinks
const socialMedia = footerData?.social_media || defaultSocialMedia
```

## Notes

- All data is cached for 1 hour
- Changes in admin panel automatically revalidate cache
- Components have fallback data if database fetch fails
- Maintain existing UI/UX while using database data

