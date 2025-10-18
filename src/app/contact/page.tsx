export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
        <p className="text-xl text-muted-foreground mb-8">
          I'd love to hear from you. Let's build something amazing together.
        </p>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Send Message
          </button>
        </form>
        
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-2xl font-semibold mb-4">Other Ways to Connect</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>📧 Email: your.email@example.com</p>
            <p>💼 LinkedIn: linkedin.com/in/yourprofile</p>
            <p>💻 GitHub: github.com/yourusername</p>
          </div>
        </div>
      </div>
    </div>
  )
}

